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
    private store: Store<AppState>
  ) {
    this.state$ = this.store.select(selectTargetState);
  }

  ngOnInit() {
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
      name: ["", Validators.required],
      copies: ["", Validators.required],
      amino_acid: ["", Validators.required],
      amino_acid_validated: [""],
      amino_acid_fasta_description: [""],
      amino_acid_sequence: [""],
      dna: ["", Validators.required],
      dna_validated: [""],
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
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.targetService.uploadFastaFile(type, file).subscribe(
        response => {
          // tslint:disable-next-line:no-string-literal
          const fastaEntry = response["fasta_entries"][0];

          if (type === "amino_acid") {
            subunit.patchValue({
              amino_acid_validated: true,
              amino_acid_fasta_description: fastaEntry.fasta_description,
              amino_acid_sequence: fastaEntry.sequence
            });
          }
          if (type === "dna") {
            subunit.patchValue({
              dna_validated: true,
              dna_fasta_description: fastaEntry.fasta_description,
              dna_sequence: fastaEntry.sequence
            });
          }
        },
        error => {
          // subunit.patchValue({ validated: false });
          // @TODO test error UI
          console.log(error);
        }
      );
    }
  }

  onSubmit(): void {
    const data = this.targetForm.value;
    this.store.dispatch(new NewTarget(data));
    // @TODO add error UI with styled alert for message
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
