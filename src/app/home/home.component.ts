import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import {
  AppState,
  selectAuthState,
  selectTargetState
} from "../store/app.states";
import { LogOut } from "../store/actions/auth.actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  state$: Observable<any>;
  url = "";
  stateSubscription: Subscription;
  isAuthenticated: false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.state$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.stateSubscription = this.state$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  /**
   * Logout dispatches LogOut action to store, which in turn removes token from localStorage and changes user's status to logged out.
   */
  logout(): void {
    this.store.dispatch(new LogOut());
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
}
