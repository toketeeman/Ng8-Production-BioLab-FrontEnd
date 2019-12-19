import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  confirmDeactivation(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || "Click Ok to continue.");
    return of(confirmation);
  }

  confirmGeneral(message?: string): boolean {
    const confirmation = window.confirm(message || "Click Ok to continue.");
    return confirmation;
  }
}
