import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  RouterState,
  ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs";
import { RegistrationSuccessComponent } from "../registration-success/registration-success.component";

@Injectable({
  providedIn: "root"
})
export class CanAccessGuard
  implements CanActivate, CanDeactivate<RegistrationSuccessComponent> {
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
      this.router.navigateByUrl("/home");
      return false;
    }
    return true;
  }

  canDeactivate(
    component: RegistrationSuccessComponent,
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
