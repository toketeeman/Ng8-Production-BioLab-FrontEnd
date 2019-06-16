import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";

@Component({
  selector: "app-new-target",
  templateUrl: "./new-target.component.html",
  styleUrls: ["./new-target.component.css"]
})
export class NewTargetComponent implements OnInit {
  targetForm: FormGroup;

  get subunits() {
    return this.targetForm.get("subunits") as FormArray;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.targetForm = this.fb.group({
      target: [""],
      partner: [""],
      proteinClass: [""],
      notes: [""],
      project: [""],
      subunits: this.fb.array([this.createSubUnit()])
    });
  }

  createSubUnit(): FormGroup {
    return this.fb.group({
      name: [""],
      copies: [""]
    });
  }

  addSubUnit() {
    this.subunits.push(this.createSubUnit());
  }

  onSubmit() {
    console.log(this.targetForm.value);
    this.router.navigate(["/subunit-interactions"]);
  }
}
