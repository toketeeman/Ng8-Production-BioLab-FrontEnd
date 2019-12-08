import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Observable, Subscription, forkJoin, of } from "rxjs";
import { tap, catchError } from 'rxjs/operators';

import { ISubunit, ISubunitInteraction, IPostTranslationalModification } from "../protein-expression.interface";
import { ValidateNumberInput } from "../validators/numberInput.validator";
import { AlertService } from "../services/alert.service";
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";
import { TargetRegistrationService } from "../services/target-registration.service";
import { TargetDetailStoreService } from "../services/target-detail-store.service";

@Component({
  templateUrl: "./subunit-interactions.component.html",
  styleUrls: ["./subunit-interactions.component.scss"]
})
export class SubunitInteractionsComponent implements OnInit, OnDestroy {
  state$: Observable<any>;
  stateSubscription: Subscription;
  interactionForm: FormGroup;
  target: string;
  subunits: ISubunit[];
  errorMessage: string | null;
  disableDeactivateGuard = false;
  interactionAndPtmSubscription: Subscription = null;

  // getters allow the subunit interactions form template to refer to dynamic formArrays by variable name
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

    this.stateSubscription = this.state$.subscribe(state => {
      if (state) {
        this.target = state.target;
        this.subunits = state.subunits;
        this.errorMessage = state.errorMessage;
      }
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
    controlName: "subunit_one_copy" | "subunit_two_copy"
  ) {
    const id = parseInt(subunitId, 10);
    const copyNumber = this.subunits.filter(unit => unit.subunit_id === id)[0]
      .copies;

    // set the maximum range of the appropriate copy number control to the subunit's number of copies
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
    // removes instance of formGroup at specified index from specified formArray
    this[groupName].removeAt(index);
  }

  onSubmit(): void {
    this.disableDeactivateGuard = true;

    forkJoin([
      this.targetRegistrationService.registerInteractions(this.interactionForm.value.subunitsArray),
      this.targetRegistrationService.registerPtms(this.interactionForm.value.ptmsArray)
    ])
      .pipe(
        tap(([interactionsResponseData, ptmsResponseData]) => {
          const subunitInteractionsUpdate: ISubunitInteraction[] = [];
          for (const interactionResponse of interactionsResponseData as ISubunitInteraction[]) {
            const interactionUpdate: ISubunitInteraction = {
              subunit_one_name: interactionResponse.subunit_one_name,
              subunit_one_copy: interactionResponse.subunit_one_copy,
              subunit_two_name: interactionResponse.subunit_two_name,
              subunit_two_copy: interactionResponse.subunit_two_copy,
              interaction: interactionResponse.interaction
            };
            subunitInteractionsUpdate.push(interactionUpdate);
          };
          const ptmsUpdate: IPostTranslationalModification[] = [];
          for (const ptmResponse of ptmsResponseData as IPostTranslationalModification[]) {
            const ptmUpdate: IPostTranslationalModification = {
              subunit_one_name: ptmResponse.subunit_one_name,
              subunit_one_residue: ptmResponse.subunit_one_residue,
              subunit_two_name: ptmResponse.subunit_two_name,
              subunit_two_residue: ptmResponse.subunit_two_residue,
              ptm: ptmResponse.ptm
            };
            ptmsUpdate.push(ptmUpdate);
          }
          this.interactionAndPtmSubscription =
            this.targetDetailStoreService.storeTargetDetailInteractionsAndPtms(subunitInteractionsUpdate, ptmsUpdate, "/home/success");
        }),
        catchError(error => {
          this.errorDialogService.openDialogForErrorResponse(error, ['non_field_errors', 'target', 'detail', 'errors']);
          return of(null);
        })
      )
      .subscribe();
  }

  canDeactivate() {
    if (this.interactionForm.untouched || this.disableDeactivateGuard) {
      return true;
    }
    return this.alert.confirm("Discard changes?");
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
