import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlimsAccessGuard implements CanActivate, CanActivateChild {
  referrer: string;

  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Only requests from SLIMS are allowed through.
    this.referrer = document.referrer;
    console.log("SLIMS Referrer: ", this.referrer);
    alert("Referrer from SLIMS Received! : " + this.referrer);   // To be used in connectivity test.

    if ((document.referrer as string).toLowerCase().includes("slims")) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivateChild();
  }
}
