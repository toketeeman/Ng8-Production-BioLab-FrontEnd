import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AppState, selectTargetState } from "../store/app.states";
import { ISubunit } from "../protein-expression.interface";

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
      this.target = state.target;
      this.subunits = state.subunits;
      console.log(this.subunits);
    });
  }

  createSubUnitInteraction() {
    return this.fb.group({
      nameA: [""],
      copyNumA: [""],
      type: [""],
      nameB: [""],
      copyNumB: [""]
    });
  }

  createPtm() {
    return this.fb.group({
      nameA: [""],
      resNumA: [""],
      nameB: [""],
      resNumB: [""],
      ptm: [""]
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

  deleteInteraction(groupName: "subunits" | "ptms", index: number) {
    // removes instance of formGroup at specified index from specified formArray
    this[groupName].removeAt(index);
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
