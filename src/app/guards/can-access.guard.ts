import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { RegistrationSummaryComponent } from "../registration-summary/registration-summary.component";

@Injectable({
  providedIn: "root"
})
export class CanAccessGuard
  implements CanActivate, CanDeactivate<RegistrationSummaryComponent> {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.router.url === "/") {
      this.router.navigateByUrl("/home/add-target");
      return false;
    }
    return true;
  }

  canDeactivate(
    component: RegistrationSummaryComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    next: RouterStateSnapshot
  ) {
    if (
      state.url === "/home/success" &&
      next.url === "/home/subunit-interactions"
    ) {
      return false;
    }
    return true;
  }
}
