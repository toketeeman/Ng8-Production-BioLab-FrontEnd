import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild
} from '@angular/router';

import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SubmitAccessGuard implements CanActivate, CanActivateChild {
  referrer: string;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {

    // Only those users having a submitter role are allowed through.
    if (this.authenticationService.hasSubmitterRole()) {
      return true;
    }
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
