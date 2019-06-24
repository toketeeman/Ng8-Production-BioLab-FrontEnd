import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Observable } from "rxjs";
import { TargetRegistrationService } from "../target-registration.service";
import { IProteinClass } from "../protein-expression.interface";

@Component({
  selector: "app-new-target",
  templateUrl: "./new-target.component.html",
  styleUrls: ["./new-target.component.css"]
})
export class NewTargetComponent implements OnInit {
  targetForm: FormGroup;
  proteinClasses$: Observable<IProteinClass[]>;

  /** getters allow the new-target form template to refer to individual controls by variable name
   */
  get subUnits() {
    return this.targetForm.get("subUnits") as FormArray;
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private targetService: TargetRegistrationService
  ) {}

  ngOnInit() {
    this.targetForm = this.fb.group({
      target: ["", Validators.required],
      partner: ["", Validators.required],
      proteinClass: ["", Validators.required],
      notes: [""],
      project: ["", Validators.required],
      subUnits: this.fb.array([this.createSubUnit()])
    });

    this.proteinClasses$ = this.targetService.getProteinClasses();
  }

  createSubUnit(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      copies: ["", Validators.required]
    });
  }

  /** Add new instance of subunit formGroup to the subunits formArray */
  addSubUnit() {
    this.subUnits.push(this.createSubUnit());
  }

  /** Remove subunit formGroup at provided index of subunits FormArray */
  deleteSubUnit(index) {
    this.subUnits.removeAt(index);
  }

  /** Submit form data to register target.
   * On success, navigate to /subunit-interactions
   * On error, retain form data, display error alert with message
   */
  onSubmit() {
    // this.targetService.registerTarget(this.targetForm.value);
    this.router.navigate(["/subunit-interactions"]);
  }
}
