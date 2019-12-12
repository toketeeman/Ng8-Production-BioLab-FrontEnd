import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { forkJoin, of } from "rxjs";
import { tap, catchError } from 'rxjs/operators';

import {
  ITargetDetail,
  ISubunit,
  ISubunitInteraction,
  IPostTranslationalModification
} from "../protein-expression.interface";
import { ValidateNumberInput } from "../validators/numberInput.validator";
import { AlertService } from "../services/alert.service";
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";
import { TargetRegistrationService } from "../services/target-registration.service";
import { TargetDetailStoreService } from "../services/target-detail-store.service";

@Component({
  templateUrl: "./subunit-interactions.component.html",
  styleUrls: ["./subunit-interactions.component.scss"]
})
export class SubunitInteractionsComponent implements OnInit {
  interactionForm: FormGroup;
  target: string;
  subunits: ISubunit[];
  disableDeactivateGuard = false;

  // Getters allow the subunit interactions form template to refer to dynamic formArrays by variable name.
  get subunitsArray() {
    return this.interactionForm.get("subunitsArray") as FormArray;
  }
  get ptmsArray() {
    return this.interactionForm.get("ptmsArray") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private errorDialogService: ErrorDialogService,
    private targetRegistrationService: TargetRegistrationService,
    private targetDetailStoreService: TargetDetailStoreService
  ) {}

  ngOnInit() {
    this.interactionForm = this.fb.group({
      subunitsArray: this.fb.array([this.createSubUnitInteraction()]),
      ptmsArray: this.fb.array([this.createPtm()])
    });

    this.targetDetailStoreService.retrieveTargetDetailStore()
      .subscribe( (targetDetail: ITargetDetail) => {
        this.subunits = targetDetail.target.subunits;
        this.target = targetDetail.target.target_name;
      });
  }

  createSubUnitInteraction() {
    return this.fb.group({
      subunit_one: ["", Validators.required],
      subunit_one_copy: [
        "",
        [Validators.required, ValidateNumberInput, Validators.min(1)]
      ],
      interaction: ["", Validators.required],
      subunit_two: ["", Validators.required],
      subunit_two_copy: [
        "",
        [Validators.required, ValidateNumberInput, Validators.min(1)]
      ]
    });
  }

  createPtm() {
    return this.fb.group({
      subunit_one: ["", Validators.required],
      subunit_one_residue: ["", [Validators.required, ValidateNumberInput]],
      subunit_two: ["", Validators.required],
      subunit_two_residue: ["", [Validators.required, ValidateNumberInput]],
      ptm: ["", Validators.required]
    });
  }

  addSubUnitInteraction() {
    // Adds new instance of subunitInteraction formGroup to subunitInteractions formArray.
    this.subunitsArray.push(this.createSubUnitInteraction());
  }

  addPtm() {
    // Adds new instance of ptm formGroup to ptms formArray.
    this.ptmsArray.push(this.createPtm());
  }

  updateCopyRange(
    subunitId: string,
    index: number,
    controlName: "subunit_one_copy" | "subunit_two_copy"
  ) {
    const id = parseInt(subunitId, 10);
    const copyNumber = this.subunits.filter(unit => unit.subunit_id === id)[0]
      .copies;

    // Set the maximum range of the appropriate copy number control to the subunit's number of copies.
    // tslint:disable-next-line:no-string-literal
    const control = this.subunitsArray.at(index)["controls"][controlName];
    control.setValidators([
      ValidateNumberInput,
      Validators.min(1),
      Validators.max(copyNumber)
    ]);
  }

  updateResidueValidator(
    subunitId: string,
    index: number,
    controlName: "subunit_one_residue" | "subunit_two_residue"
  ) {
    const id = parseInt(subunitId, 10);
    const residueLength = this.subunits.filter(
      unit => unit.subunit_id === id
    )[0].amino_acid_sequence.length;

    // tslint:disable-next-line:no-string-literal
    const control = this.ptmsArray.at(index)["controls"][controlName];
    control.setValidators([
      ValidateNumberInput,
      Validators.min(1),
      Validators.max(residueLength)
    ]);
  }

  deleteInteraction(groupName: "subunitsArray" | "ptmsArray", index: number) {
    // Removes instance of formGroup at specified index from specified formArray.
    this[groupName].removeAt(index);
  }

  SubunitIDToName(id: any): string {
    return this.subunits.find((subunit) => id.toString() === subunit.subunit_id.toString()).subunit_name;
  }

  onSubmit(): void {
    this.disableDeactivateGuard = true;

    forkJoin([
      this.targetRegistrationService.registerInteractions(this.interactionForm.value.subunitsArray)
        .pipe(
          catchError(error => {
            this.errorDialogService.openDialogForErrorResponse(
              error,
              ['message'],
              "The interaction(s) cannot be registered."
            );
            const noResults: any[] = [];
            return of(noResults);
          })
        ),
      this.targetRegistrationService.registerPtms(this.interactionForm.value.ptmsArray)
        .pipe(
          catchError(error => {
            this.errorDialogService.openDialogForErrorResponse(
              error,
              ['message'],
              "The PTM(s) cannot be registered."
            );
            const noResults: any[] = [];
            return of(noResults);
          })
        ),
    ])
      .pipe(
        tap(([interactionsResponseData, ptmsResponseData]) => {
          // Check for failures.
          const interactionsFailed = (interactionsResponseData as any[]).length === 0;
          const ptmsFailed = (ptmsResponseData as any[]).length === 0;

          if ( interactionsFailed || ptmsFailed) {
            if ( interactionsFailed !== ptmsFailed) {
              if ( interactionsFailed ) {
                // TODO: Undo the ptms registration here.

                // Report the interactions failure.
                this.errorDialogService.openDialogForMessages(
                  "The interaction(s) cannot be registered."
                );
              } else {
                // TODO: Undo the interactions registration here.

                // Report the ptms failure.
                this.errorDialogService.openDialogForMessages(
                  "The PTMs cannot be registered."
                );
              }
            } else {
              // Report the mutual interactions and ptms failures.
              this.errorDialogService.openDialogForMessages(
                "Both the interaction(s) and the PTM(s) cannot be registered."
              );
            }
            // TODO: Undo parent target registration here.

          } else {
            // Successful registrations for both interactions and ptms.

            // Move from back-end format to UI format.
            const subunitInteractionsUpdate: ISubunitInteraction[] = [];
            for ( const interactionResponse of interactionsResponseData as any[] ) {
              const interactionUpdate: ISubunitInteraction = {
                subunit_one_name: this.SubunitIDToName(interactionResponse.subunit_one),
                subunit_one_copy: interactionResponse.subunit_one_copy,
                subunit_two_name: this.SubunitIDToName(interactionResponse.subunit_two),
                subunit_two_copy: interactionResponse.subunit_two_copy,
                interaction: interactionResponse.interaction
              };
              subunitInteractionsUpdate.push(interactionUpdate);
            }

            // Move from back-end format to UI format.
            const ptmsUpdate: IPostTranslationalModification[] = [];
            for ( const ptmResponse of ptmsResponseData as any[] ) {
              const ptmUpdate: IPostTranslationalModification = {
                subunit_one_name: this.SubunitIDToName(ptmResponse.subunit_one),
                subunit_one_residue: ptmResponse.subunit_one_residue,
                subunit_two_name: this.SubunitIDToName(ptmResponse.subunit_two),
                subunit_two_residue: ptmResponse.subunit_two_residue,
                ptm: ptmResponse.ptm
              };
              ptmsUpdate.push(ptmUpdate);
            }

            this.targetDetailStoreService.storeTargetDetailInteractionsAndPtms(
              subunitInteractionsUpdate,
              ptmsUpdate,
              "/home/success");
          }
        })
      )
      .subscribe();
  }

  canDeactivate() {
    // TODO: Need logic here to handle option to cancel the parent target registration!

    if (this.interactionForm.untouched || this.disableDeactivateGuard) {
      return true;
    }
    return this.alert.confirm("Discard changes?");
  }

}
