import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { IProteinClass } from "./protein-expression.interface";

@Injectable({
  providedIn: "root"
})
export class TargetRegistrationService {
  private proteinClassesUrl = "api/proteinClasses"; // temp URL to mock web api
  private targetUrl = "api/targetUrl";

  constructor(private http: HttpClient) {}

  /** GET protein classes from backend
   * @returns Observable<IProteinClass[]>
   */
  getProteinClasses(): Observable<IProteinClass[]> {
    return this.http
      .get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(catchError(this.handleError<IProteinClass[]>("getProteinClasses")));
  }

  /** POST register new protein target
   * @param target: ITarget
   */
  registerTarget(target) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    console.log(target);
    return this.http.post(this.targetUrl, target, httpOptions);
  }

  /** POST register subunit interactions */
  registerInteractions() {}

  /**
   * Handle failed http operation
   * @param operation - name of failed http operation
   */
  private handleError<T>(operation: string) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return;
    };
  }
}
