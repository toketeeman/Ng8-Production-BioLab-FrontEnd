import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";

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

  get target() {
    return this.targetForm.get("target") as FormControl;
  }
  get partner() {
    return this.targetForm.get("partner") as FormControl;
  }
  get project() {
    return this.targetForm.get("project") as FormControl;
  }

  get proteinClass() {
    return this.targetForm.get("proteinClass") as FormControl;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.targetForm = this.fb.group({
      target: ["", Validators.required],
      partner: ["", Validators.required],
      proteinClass: ["", Validators.required],
      notes: [""],
      project: ["", Validators.required],
      subunits: this.fb.array([this.createSubUnit()]) // subunits must be one entry long with all fields completed
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
