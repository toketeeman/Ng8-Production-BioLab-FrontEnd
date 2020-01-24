import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { ICurrentRoles } from '../protein-expression.interface';
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";
import { AppSettings } from "../appsettings/appsettings";

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
          for ( const role of currentRoles.groups ) {
            roles.push(role);
          }

          // Put (only) the array of roles for the user into session storage.
          sessionStorage.setItem("currentRoles", JSON.stringify(roles));
        }),
        catchError(error => {
          this.errorDialogService.openDialogForMessages(
            "Roles database is not available. See admin."
          );
          return of(null);
        })
      )
      .subscribe((currentRoles) => {
        if (currentRoles) {
          if (this.hasSubmitterRole()) {
            this.router.navigateByUrl("/home/add-target");
          }
          else if (this.hasViewerRole()) {
            this.router.navigateByUrl("/home/search-targets");
          }
          else {
            this.errorDialogService.openDialogForMessages(
              "No roles appropriate for this app have been approved for you. See admin."
            );
          }
        }
        // Fall through to remain on login page due to insufficient role priviledges.
      });
  }

  hasSubmitterRole(): boolean {
    const currentRoles: string[] = JSON.parse(sessionStorage.getItem("currentRoles"));
    return currentRoles.includes(AppSettings.SUBMITTER_ROLE);
  }

  hasViewerRole(): boolean {
    const currentRoles: string[] = JSON.parse(sessionStorage.getItem("currentRoles"));
    return currentRoles.includes(AppSettings.VIEWER_ROLE);
  }

  logOut() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentRoles");
  }
}
