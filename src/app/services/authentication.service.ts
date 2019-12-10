import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { LogOut } from '../store/actions/auth.actions';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  redirectUrl: string;
  loginUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = environment.urls.loginUrl;
  }

  // Returns token (or null) from browser's SESSION storage.
  getToken(): string {
    return sessionStorage.getItem("token");
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(
        tap( (user) => {
          sessionStorage.setItem("token", user.token);
        })
      );
  }

  logOut() {
    sessionStorage.removeItem("token");
  }
}
