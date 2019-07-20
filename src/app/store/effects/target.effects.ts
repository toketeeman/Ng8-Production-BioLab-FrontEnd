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
  NewTargetFailure,
  SubunitInteractions,
  SubunitInteractionsSuccess,
  SubunitInteractionsFailure
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
          console.log(targetObj);
          return new NewTargetSuccess({
            target: targetObj.target,
            subunits: targetObj.subunits
          });
        }),
        catchError(error => {
          console.log(error);
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
