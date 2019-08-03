import { Action } from "@ngrx/store";

export enum TargetRegistrationActionTypes {
  NEW_TARGET = "[NewTarget] Registration",
  NEW_TARGET_SUCCESS = "[NewTarget] Registration Success",
  NEW_TARGET_FAILURE = "[NewTarget] Registration Failure"
}

export class NewTarget implements Action {
  readonly type = TargetRegistrationActionTypes.NEW_TARGET;
  constructor(public data: any) {}
}

export class NewTargetSuccess implements Action {
  readonly type = TargetRegistrationActionTypes.NEW_TARGET_SUCCESS;
  constructor(public data: any) {}
}

export class NewTargetFailure implements Action {
  readonly type = TargetRegistrationActionTypes.NEW_TARGET_FAILURE;
  constructor(public data: any) {}
}

export type All = NewTarget | NewTargetSuccess | NewTargetFailure;
