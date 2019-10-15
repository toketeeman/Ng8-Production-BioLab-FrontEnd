import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { devUrls, prodUrls } from "../../environments/environment";

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
      this.loginUrl = devUrls.plasmidsUrl;
    } else {
      this.loginUrl = prodUrls.plasmidsUrl;
    }
  }

  /** Returns token from browser's local storage
   */
  getToken(): string {
    return sessionStorage.getItem("token");
  }

  /** POST log in user
   * @params username, password
   * @returns token if credentials are valid
   */
  logIn(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.loginUrl, user, httpOptions);
  }
}
