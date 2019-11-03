import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { devUrls, prodUrls } from "../../environments/environment-urls";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  redirectUrl: string;
  loginUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.loginUrl = devUrls.loginUrl;
    } else {
      this.loginUrl = prodUrls.loginUrl;
    }
  }

  /** Returns token from browser's local storage
   */
  getToken(): string {
    return sessionStorage.getItem("token");
  }

  logIn(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.loginUrl, user, httpOptions);
  }
}
