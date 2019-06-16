import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "app-subunit-interactions",
  templateUrl: "./subunit-interactions.component.html",
  styleUrls: ["./subunit-interactions.component.css"]
})
export class SubunitInteractionsComponent implements OnInit {
  interactionForm: FormGroup;

  get subunits() {
    return this.interactionForm.get("subunits") as FormArray;
  }

  get ptms() {
    return this.interactionForm.get("ptms") as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.interactionForm = this.fb.group({
      subunits: this.fb.array([this.createSubUnitInteraction()]),
      ptms: this.fb.array([this.createPtm()])
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
    this.subunits.push(this.createSubUnitInteraction());
  }

  addPtm() {
    this.ptms.push(this.createPtm());
  }
}
