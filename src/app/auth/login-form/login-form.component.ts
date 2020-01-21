import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private errorDialogService: ErrorDialogService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(): void {
    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authenticationService.logIn(data.username, data.password)
      .pipe(
        tap( (user) => {
          this.authenticationService.initializeRoles();
          // this.router.navigateByUrl("/home/add-target");    // Remove when roles endpoint has been established.
        }),
        catchError(error => {
          this.errorDialogService.openDialogForErrorResponse(
            error,
            ['non_field_errors', 'message'],
            "Invalid credentials."
          );
          return of(null);
        })
      )
      .subscribe();
  }

}
