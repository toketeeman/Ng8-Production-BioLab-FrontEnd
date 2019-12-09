import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Observable, Subscription, of } from "rxjs";

import { TargetRegistrationService } from "../services/target-registration.service";
import { TargetDetailStoreService } from "../services/target-detail-store.service";
import { AlertService } from "../services/alert.service";
import {
  IProteinClass,
  IFastaResponse,
  ITargetDetailHeader
} from '../protein-expression.interface';
import { ValidateNumberInput } from "../validators/numberInput.validator";
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";
import { ProteinClassesService } from "../services/protein-classes.service";
import { tap, catchError } from 'rxjs/operators';

@Component({
  templateUrl: "./new-target.component.html",
  styleUrls: ["./new-target.component.scss"]
})
export class NewTargetComponent implements OnInit, OnDestroy {
  targetForm: FormGroup;
  proteinClasses$: Observable<IProteinClass[]>;
  errorMessage: string | null;
  disableDeactivateGuard = false;
  targetUpdateSubscription: Subscription = null;

  /** getters allow the new-target form template to refer to individual controls by variable name
   */
  get subunits() {
    return this.targetForm.get("subunits") as FormArray;
  }
  get target() {
    return this.targetForm.get("target_name") as FormControl;
  }
  get partner() {
    return this.targetForm.get("partner") as FormControl;
  }
  get project() {
    return this.targetForm.get("project_name") as FormControl;
  }
  get protein_class_pk() {
    return this.targetForm.get("protein_class_pk") as FormControl;
  }

  get notes() {
    return this.targetForm.get("notes") as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private targetRegistrationService: TargetRegistrationService,
    private alert: AlertService,
    private errorDialogService: ErrorDialogService,
    private proteinClassesService: ProteinClassesService,
    private targetDetailStoreService: TargetDetailStoreService
  ) { }

  ngOnInit() {
    this.targetForm = this.fb.group({
      target_name: ["", Validators.required],
      partner: ["", Validators.required],
      protein_class_pk: ["", Validators.required],
      notes: [""],
      project_name: ["", Validators.required],
      subunits: this.fb.array([this.createSubunit()])
    });

    // Initialize the protein classes lookup service.
    this.proteinClasses$ = this.targetRegistrationService.getProteinClasses()
                            .pipe(
                              tap( (classes: IProteinClass[]) => {
                                this.proteinClassesService.initProteinClasses(classes);
                              }
                            ));

    // Reset the target detail store.
    this.targetDetailStoreService.resetTargetDetailStore();
  }

  createSubunit(): FormGroup {
    return this.fb.group({
      subunit_name: ["", Validators.required],
      copies: [
        "",
        [Validators.required, ValidateNumberInput, Validators.min(1)]
      ],
      amino_acid: ["", Validators.required],
      amino_acid_fileName: [""],
      amino_acid_fasta_description: [""],
      amino_acid_sequence: [""],
      dna: ["", Validators.required],
      dna_fileName: [""],
      dna_fasta_description: [""],
      dna_sequence: [""]
    });
  }

  // Add new instance of subunit formGroup to the subunits formArray.
  addSubunit() {
    this.subunits.push(this.createSubunit());
  }

 // Remove subunit formGroup at provided index of subunits FormArray.
  deleteSubunit(index: number) {
    this.subunits.removeAt(index);
  }

  onFileChange(type: "amino_acid" | "dna", event: any, index: number) {
    const subunit = this.subunits.get(index.toString());
    const control = subunit.get(type);

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.targetRegistrationService.uploadFastaFile(type, file).subscribe(
        (response: IFastaResponse) => {
          const fastaEntry = response.fasta_entries[0];

          if (type === "amino_acid") {
            subunit.patchValue({
              amino_acid_fileName: file.name,
              amino_acid_fasta_description: fastaEntry.fasta_description,
              amino_acid_sequence: fastaEntry.sequence
            });
          }
          if (type === "dna") {
            subunit.patchValue({
              dna_fileName: file.name,
              dna_fasta_description: fastaEntry.fasta_description,
              dna_sequence: fastaEntry.sequence
            });
          }
        },
        (error: any) => {
          control.patchValue(null);
          this.errorDialogService.openDialogForErrorResponse(error, ['non_field_errors']);
        }
      );
    }
  }

  canDeactivate() {
    if (this.targetForm.untouched || this.disableDeactivateGuard) {
      return true;
    }
    return this.alert.confirm("Discard changes?");
  }

  onSubmit(): void {
    this.disableDeactivateGuard = true;
    this.targetRegistrationService.registerTarget(this.targetForm.value)
      .pipe(
        tap( (targetResponseData) => {

          // Move from back-end format to UI format.
          const targetUpdate: ITargetDetailHeader = {
            target_name: targetResponseData.target,
            target_id: targetResponseData.id,
            partner: targetResponseData.partner,
            class: this.proteinClassesService.pkToProteinClassName(targetResponseData.protein_class_pk),
            notes: targetResponseData.notes,
            project_name: targetResponseData.project,
            subunits: targetResponseData.subunits
          };
          console.log("Target Registration Update: ", JSON.stringify(targetUpdate));
          // this.targetUpdateSubscription =
          //   this.targetDetailStoreService.storeTargetDetailHeader(targetUpdate, "/home/subunit-interactions");
        }),
        catchError(error => {
          this.errorDialogService.openDialogForErrorResponse(error, ['non_field_errors', 'target', 'detail', 'errors']);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.targetUpdateSubscription) {
      this.targetUpdateSubscription.unsubscribe();
    }
  }

  isPositive(n: number): boolean {
    return n > 0;
  }
}
