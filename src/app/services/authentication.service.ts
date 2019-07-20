import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private authUrl = "api/users";

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  /** Returns token from browser's local storage
   */
  getToken(): string {
    return localStorage.getItem("token");
  }

  /** POST log in user
   * @params username, password
   * @returns token if credentials are valid
   */
  logIn(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.authUrl, user, httpOptions);
  }
}
