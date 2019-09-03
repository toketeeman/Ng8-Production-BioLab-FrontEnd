import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, zip, Subscription } from "rxjs";
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
  registrationSubscription: Subscription;
  interactions: any[];
  ptms: any[];

  constructor(private store: Store<AppState>) {
    this.target$ = this.store.select(selectTargetState);
    this.interactions$ = this.store.select(selectInteractionsState);
  }

  ngOnInit() {
    this.registrationSubscription = zip(
      this.target$,
      this.interactions$
    ).subscribe(([target, interactionData]) => {
      this.interactions = interactionData.interactions.map(interaction => {
        interaction.origin_subunit_name = this.setSubunitName(
          interaction.origin_subunit,
          target.subunits
        );
        interaction.destination_subunit_name = this.setSubunitName(
          interaction.destination_subunit,
          target.subunits
        );
        return interaction;
      });

      this.ptms = interactionData.ptms.map(ptm => {
        ptm.origin_subunit_name = this.setSubunitName(
          ptm.origin_subunit,
          target.subunits
        );
        ptm.destination_subunit_name = this.setSubunitName(
          ptm.destination_subunit,
          target.subunits
        );
        return ptm;
      });
    });
  }

  ngOnDestroy() {
    this.registrationSubscription.unsubscribe();
  }

  setSubunitName(interactionId: any, subunits: any[]) {
    return subunits.filter(unit => {
      return parseInt(unit.subunit_id, 10) === parseInt(interactionId, 10);
    })[0].subunit_name;
  }
}
