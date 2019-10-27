import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { TargetRegistrationService } from "../../services/target-registration.service";
import {
  TargetRegistrationActionTypes,
  NewTarget,
  NewTargetSuccess,
  NewTargetFailure
} from "../actions/target.actions";

@Injectable()
export class TargetEffects {
  constructor(
    private actions: Actions,
    private targetRegistrationService: TargetRegistrationService,
    private router: Router
  ) {}

  @Effect()
  NewTarget: Observable<any> = this.actions.pipe(
    ofType(TargetRegistrationActionTypes.NEW_TARGET),
    map((action: NewTarget) => action.data),
    switchMap(data => {
      return this.targetRegistrationService.registerTarget(data).pipe(
        map(targetObj => {
          return new NewTargetSuccess({
            target: targetObj.target,
            partner: targetObj.partner,
            protein_class_pk: targetObj.protein_class_pk,
            notes: targetObj.notes,
            project_name: targetObj.project_name,
            subunits: targetObj.subunits
          });
        }),
        catchError(error => {
          console.log("target effects: register target: ", JSON.stringify(error));

          return of(new NewTargetFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  NewTargetSuccess: Observable<any> = this.actions.pipe(
    ofType(TargetRegistrationActionTypes.NEW_TARGET_SUCCESS),
    tap(target => {
      this.router.navigateByUrl("/home/subunit-interactions");
    })
  );

  @Effect({ dispatch: false })
  NewTargetFailure: Observable<any> = this.actions.pipe(
    ofType(TargetRegistrationActionTypes.NEW_TARGET_FAILURE)
  );
}
