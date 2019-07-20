import { createFeatureSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducers";
import * as target from "./reducers/target.reducers";

export interface AppState {
  authState: auth.State;
  targetState: target.State;
}

export const reducers = {
  auth: auth.reducer,
  target: target.reducer
};

export const selectAuthState = createFeatureSelector<AppState>("auth");

export const selectTargetState = createFeatureSelector<AppState>("target");
