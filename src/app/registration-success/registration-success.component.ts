import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  AppState,
  selectTargetState,
  selectInteractionsState
} from "../store/app.states";
@Component({
  selector: "app-registration-success",
  templateUrl: "./registration-success.component.html",
  styleUrls: ["./registration-success.component.css"]
})
export class RegistrationSuccessComponent implements OnInit, OnDestroy {
  target$: Observable<any>;
  interactions$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.target$ = this.store.select(selectTargetState);
    this.interactions$ = this.store.select(selectInteractionsState);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
