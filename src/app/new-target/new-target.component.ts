import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { TargetRegistrationService } from "../services/target-registration.service";
import { AlertService } from "../services/alert.service";
import { IProteinClass } from "../protein-expression.interface";
import { AppState, selectTargetState } from "../store/app.states";
import { NewTarget } from "../store/actions/target.actions";

@Component({
  selector: "app-new-target",
  templateUrl: "./new-target.component.html",
  styleUrls: ["./new-target.component.css"]
})
export class NewTargetComponent implements OnInit, OnDestroy {
  targetForm: FormGroup;
  proteinClasses$: Observable<IProteinClass[]>;
  state$: Observable<any>;
  stateSubscription: Subscription;
  errorMessage: string | null;
  disableDeactivateGuard = false;

  /** getters allow the new-target form template to refer to individual controls by variable name
   */
  get subunits() {
    return this.targetForm.get("subunits") as FormArray;
  }
  get target() {
    return this.targetForm.get("target") as FormControl;
  }
  get partner() {
    return this.targetForm.get("partner") as FormControl;
  }
  get project() {
    return this.targetForm.get("project") as FormControl;
  }
  get protein_class_pk() {
    return this.targetForm.get("protein_class_pk") as FormControl;
  }

  get notes() {
    return this.targetForm.get("notes") as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private targetService: TargetRegistrationService,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.state$ = this.store.select(selectTargetState);
  }

  ngOnInit() {
    console.log("NewTarget: init");
    this.stateSubscription = this.state$.subscribe(state => {
      if (state) {
        this.errorMessage = state.errorMessage;
      }
    });

    this.targetForm = this.fb.group({
      target: ["", Validators.required],
      partner: ["", Validators.required],
      protein_class_pk: ["", Validators.required],
      notes: [""],
      project: ["", Validators.required],
      subunits: this.fb.array([this.createSubunit()])
    });

    this.proteinClasses$ = this.targetService.getProteinClasses();
  }

  createSubunit(): FormGroup {
    return this.fb.group({
      subunit_name: ["", Validators.required],
      copies: ["", Validators.required],
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

  /** Add new instance of subunit formGroup to the subunits formArray */
  addSubunit() {
    this.subunits.push(this.createSubunit());
  }

  /** Remove subunit formGroup at provided index of subunits FormArray */
  deleteSubunit(index: number) {
    this.subunits.removeAt(index);
  }

  onFileChange(type: "amino_acid" | "dna", event: any, index: number) {
    const subunit = this.subunits.get(index.toString());
    const control = subunit.get(type);

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.targetService.uploadFastaFile(type, file).subscribe(
        response => {
          // tslint:disable-next-line:no-string-literal
          const fastaEntry = response["fasta_entries"][0];

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
        error => {
          /** Form control filename value could be patched as shown with error message
           * string or a status code in order to show conditional error messages in the template.
           */
          // subunit.get(`${type}_fileName`).patchValue(error.non_field_errors[0]);
          console.log(error);
          control.patchValue(null);
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
    const data = this.targetForm.value;
    this.store.dispatch(new NewTarget(data));
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
