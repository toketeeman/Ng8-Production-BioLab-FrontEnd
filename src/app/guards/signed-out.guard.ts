import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate
} from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class SignedOutGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {
    // If we have been routed to the login page but are already logged in,
    // then we instead go direct to the add-new-target page.
    if (this.authenticationService.getToken()) {
      this.router.navigate(["/home/add-target"]);
      return false;
    }
    return true;
  }
}
