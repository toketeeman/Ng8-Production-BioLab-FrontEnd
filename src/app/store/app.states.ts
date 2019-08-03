import { createFeatureSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducers";
import * as target from "./reducers/target.reducers";
import * as interactions from "./reducers/interactions.reducers";

export interface AppState {
  authState: auth.State;
  targetState: target.State;
  interactionsState: interactions.State;
}

export const reducers = {
  auth: auth.reducer,
  target: target.reducer,
  interactions: interactions.reducer
};

export const selectAuthState = createFeatureSelector<AppState>("auth");

export const selectTargetState = createFeatureSelector<AppState>("target");

export const selectInteractionsState = createFeatureSelector<AppState>(
  "interactions"
);
