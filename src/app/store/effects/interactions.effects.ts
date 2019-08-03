import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { TargetRegistrationService } from "../../services/target-registration.service";
import {
  InteractionsRegistrationActionTypes,
  SubunitInteractions,
  SubunitInteractionsSuccess,
  SubunitInteractionsFailure
} from "../actions/interactions.actions";

@Injectable()
export class InteractionsEffects {
  constructor(
    private actions: Actions,
    private targetRegistrationService: TargetRegistrationService,
    private router: Router
  ) {}

  @Effect()
  SubunitInteractions: Observable<any> = this.actions.pipe(
    ofType(InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS),
    map((action: SubunitInteractions) => action.data),
    switchMap(data => {
      return this.targetRegistrationService.registerInteractions(data).pipe(
        map(interactionsObj => {
          return new SubunitInteractionsSuccess({
            interactions: interactionsObj.interactions,
            ptms: interactionsObj.ptms
          });
        }),
        catchError(error => {
          return of(new SubunitInteractionsFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SubunitInteractionsSuccess: Observable<any> = this.actions.pipe(
    ofType(InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_SUCCESS),
    tap(interactions => {
      this.router.navigateByUrl("/home/success");
    })
  );

  @Effect({ dispatch: false })
  SubunitInteractionsFailure: Observable<any> = this.actions.pipe(
    ofType(InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_FAILURE)
  );
}
