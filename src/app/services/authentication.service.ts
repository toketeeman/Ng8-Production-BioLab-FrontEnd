import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { ICurrentRoles } from '../protein-expression.interface';
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  redirectUrl: string;
  loginUrl: string;
  currentRolesUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorDialogService: ErrorDialogService
  ) {
    this.loginUrl = environment.urls.loginUrl;
    this.currentRolesUrl = environment.urls.currentRolesUrl;
  }

  // Returns token (or null) from browser's SESSION storage.
  getToken(): string {
    return sessionStorage.getItem("token");
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(
        tap( (user) => {
          sessionStorage.setItem("token", user.key);
        })
      );
  }

  initializeRoles(): void {
    this.http.get<ICurrentRoles>(this.currentRolesUrl)
      .pipe(
        tap ( (currentRoles: ICurrentRoles) => {
          const roles: string[] = [];
          for ( const role of currentRoles.roles ) {
            roles.push(role);
          }
          sessionStorage.setItem("currentRoles", JSON.stringify(roles));
        }
      ),
      catchError(error => {
        this.errorDialogService.openDialogForMessages(
          "No roles are available. See admin."
        );
        return of(null);
      }))
      .subscribe((currentRoles) => {
        if (currentRoles) {
          this.router.navigateByUrl("/home/add-target");
        }
      });
  }

  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentRoles");
  }
}
