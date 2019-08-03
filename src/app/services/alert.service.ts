import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || "Click Ok to continue.");
    return of(confirmation);
  }
}
