import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { IProteinClass } from "./protein-expression.interface";

@Injectable({
  providedIn: "root"
})
export class TargetRegistrationService {
  private proteinClassesUrl = "api/proteinClasses"; // temp URL to mock web api
  private targetUrl = "api/targetUrl";

  constructor(private http: HttpClient) {}

  /** GET protein classes from backend */
  getProteinClasses(): Observable<IProteinClass[]> {
    return this.http.get<IProteinClass[]>(this.proteinClassesUrl).pipe();
    // @TODO add error handling
  }

  /** POST register new protein target */
  registerTarget(target) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    console.log(target);
    return this.http.post(this.targetUrl, target, httpOptions);
  }

  /** POST register subunit interactions */
  registerInteractions() {}

  private handleError(error: HttpErrorResponse) {

  }
}
