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
export class ViewAccessGuard implements CanActivate, CanActivateChild {
  referrer: string;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {

    // Only those users having a viewer role are allowed through.
    if (this.authenticationService.hasViewerRole()) {
      return true;
    }
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
