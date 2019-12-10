import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  state$: Observable<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authenticationService.getToken()) {
      this.router.navigate(["/login"]);

      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
