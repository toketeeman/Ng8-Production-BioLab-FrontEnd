import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

const url = "api/users/authenticate";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => (this.isLoggedIn = true))
    );
  }

  logout(): void {
    console.log("logged out");
    this.isLoggedIn = false;
  }
}
