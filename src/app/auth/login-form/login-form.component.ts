import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    this.authService.login().subscribe(() => {
      console.log("logged in!");
      const redirect = this.authService.redirectUrl
        ? this.router.parseUrl(this.authService.redirectUrl)
        : "/home";

      this.router.navigateByUrl(redirect);
    });
  }
}
