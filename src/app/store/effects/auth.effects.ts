import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  LogOut
} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private errorDialogService: ErrorDialogService
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.data),
    switchMap(data => {
      return this.authService.logIn(data.username, data.password).pipe(
        map(user => {
          return new LogInSuccess({
            token: user.key,
            username: data.username
          });
        }),
        catchError(error => {
          this.errorDialogService.openDialogForErrorResponse(error, ['non_field_errors']);
          return of(new LogInFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      sessionStorage.setItem("token", user.data.token);
      this.router.navigateByUrl("/home/add-target");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      sessionStorage.removeItem("token");
      this.router.navigateByUrl("/login");
    })
  );
}
