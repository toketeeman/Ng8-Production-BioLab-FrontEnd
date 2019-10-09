import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationExtras
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  state$: Observable<any>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      console.log("AuthGuard: canActivate() false");
      this.router.navigate(["/login"]);

      return false;
    }
    console.log("AuthGuard: canActivate() true");
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
