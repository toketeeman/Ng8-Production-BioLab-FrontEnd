import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AppState, selectTargetState } from "../store/app.states";
import { ISubunit } from "../protein-expression.interface";
import { SubunitInteractions } from "../store/actions/interactions.actions";

@Component({
  selector: "app-subunit-interactions",
  templateUrl: "./subunit-interactions.component.html",
  styleUrls: ["./subunit-interactions.component.css"]
})
export class SubunitInteractionsComponent implements OnInit, OnDestroy {
  state$: Observable<any>;
  stateSubscription: Subscription;
  interactionForm: FormGroup;
  target: string;
  subunits: ISubunit[];
  errorMessage: string | null;
  disableDeactivateGuard = false;

  // getters allow the subunit interactions form template to refer to dynamic formArrays by variable name
  get subunitsArray() {
    return this.interactionForm.get("subunitsArray") as FormArray;
  }
  get ptmsArray() {
    return this.interactionForm.get("ptmsArray") as FormArray;
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.state$ = this.store.select(selectTargetState);
  }

  ngOnInit() {
    this.interactionForm = this.fb.group({
      subunitsArray: this.fb.array([this.createSubUnitInteraction()]),
      ptmsArray: this.fb.array([this.createPtm()])
    });

    this.stateSubscription = this.state$.subscribe(state => {
      if (state) {
        console.log(state);
        this.target = state.target;
        this.subunits = state.subunits;
        this.errorMessage = state.errorMessage;
      }
    });
  }

  createSubUnitInteraction() {
    return this.fb.group({
      origin_subunit: ["", Validators.required],
      origin_subunit_copy: ["", [Validators.required, Validators.min(1)]],
      interaction: ["", Validators.required],
      destination_subunit: ["", Validators.required],
      destination_subunit_copy: ["", [Validators.required, Validators.min(1)]]
    });
  }

  createPtm() {
    return this.fb.group({
      origin_subunit: ["", Validators.required],
      origin_subunit_residue: ["", Validators.required],
      destination_subunit: ["", Validators.required],
      destination_subunit_residue: ["", Validators.required],
      ptm: ["", Validators.required]
    });
  }

  addSubUnitInteraction() {
    // adds new instance of subunitInteraction formGroup to subunitInteractions formArray
    this.subunitsArray.push(this.createSubUnitInteraction());
  }

  addPtm() {
    // adds new instance of ptm formGroup to ptms formArray
    this.ptmsArray.push(this.createPtm());
  }

  updateCopyRange(
    subunitId: string,
    index: number,
    controlName: "origin_subunit_copy" | "destination_subunit_copy"
  ) {
    const id = parseInt(subunitId, 10);
    const copyNumber = this.subunits.filter(unit => unit.subunit_id === id)[0]
      .copies;

    // set the maximum range of the appropriate copy number control to the subunit's number of copies
    // tslint:disable-next-line:no-string-literal
    const control = this.subunitsArray.at(index)["controls"][controlName];
    control.setValidators([Validators.min(1), Validators.max(copyNumber)]);
  }

  updateResidueValidator(
    subunitId: string,
    index: number,
    controlName: "origin_subunit_residue" | "destination_subunit_residue"
  ) {
    const id = parseInt(subunitId, 10);
    const residueLength = this.subunits.filter(
      unit => unit.subunit_id === id
    )[0].amino_acid_sequence.length;

    // tslint:disable-next-line:no-string-literal
    const control = this.ptmsArray.at(index)["controls"][controlName];

    control.setValidators([Validators.min(1), Validators.max(residueLength)]);
  }

  deleteInteraction(groupName: "subunitsArray" | "ptmsArray", index: number) {
    // removes instance of formGroup at specified index from specified formArray
    this[groupName].removeAt(index);
  }

  onSubmit(): void {
    this.disableDeactivateGuard = true;
    const data = {
      interactions: this.interactionForm.value.subunitsArray,
      ptms: this.interactionForm.value.ptmsArray
    };
    this.store.dispatch(new SubunitInteractions(data));
  }

  canDeactivate() {
    if (this.disableDeactivateGuard) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
