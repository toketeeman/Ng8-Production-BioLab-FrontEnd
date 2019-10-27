import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AppState, selectAuthState } from "../../store/app.states";
import { LogIn } from "../../store/actions/auth.actions";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  state$: Observable<any>;
  stateSubscription: Subscription;

  errorMessage: string | null;

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>,
    private errorDialogService: ErrorDialogService) {
      this.state$ = this.store.select(selectAuthState);
    }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.stateSubscription = this.state$.subscribe(state => {
      this.errorMessage = state.errorMessage;
      if (this.errorMessage) {
        this.errorDialogService.openDialogForMessages(this.errorMessage);
      }
    });
  }

  login(): void {
    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new LogIn(data));
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
