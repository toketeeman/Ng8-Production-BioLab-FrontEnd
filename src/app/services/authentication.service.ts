import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

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
    this.loginUrl = environment.urls.loginUrl;
  }

  // Returns token from browser's SESSION storage.
  getToken(): string {
    return sessionStorage.getItem("token");
  }

  logIn(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.loginUrl, user, httpOptions);
  }
}
