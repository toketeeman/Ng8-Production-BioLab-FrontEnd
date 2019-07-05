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
    private router: Router,
    private targetService: TargetRegistrationService
  ) {}

  ngOnInit() {
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

  /** Upload and validate the FASTA file
   * We use the FileReader web API to read the contents of the FASTA file and then patch the form with this value.
   * Adopted from: https://medium.com/@amcdnl/file-uploads-with-angular-reactive-forms-960fd0b34cb5
   * FileReader API docs: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
   */
  onFileChange(type: "amino_acid" | "dna", event: any, index: number) {
    const subunit = this.subunits.get(index.toString());
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.targetService.uploadFastaFile(type, reader.result).subscribe(
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
            console.log(error);
          }
        );
      };
    }
  }

  /** Submit form data to register target.
   *  On success, navigate to /subunit-interactions
   *  On error, retain form data, display error alert with message
   */
  onSubmit() {
    this.targetService.registerTarget(this.targetForm.value).subscribe(
      response => {
        console.log(response);
        this.router.navigate(["home/subunit-interactions"]);
      },
      error => {
        console.log(error);
        // @TODO add error UI with styled alert for message
      }
    );
  }
}
