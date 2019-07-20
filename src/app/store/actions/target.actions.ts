import { Action } from "@ngrx/store";

export enum TargetRegistrationActionTypes {
  NEW_TARGET = "[NewTarget] Registration",
  NEW_TARGET_SUCCESS = "[NewTarget] Registration Success",
  NEW_TARGET_FAILURE = "[NewTarget] Registration Failure",
  SUBUNIT_INTERACTIONS = "[Subunit Interactions] Registration",
  SUBUNIT_INTERACTIONS_SUCCESS = "[Subunit Interactions] Registration Success",
  SUBUNIT_INTERACTIONS_FAILURE = "[Subunit Interactions] Registration Failure"
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

export class SubunitInteractions implements Action {
  readonly type = TargetRegistrationActionTypes.SUBUNIT_INTERACTIONS;
  constructor(public data: any) {}
}

export class SubunitInteractionsSuccess implements Action {
  readonly type = TargetRegistrationActionTypes.SUBUNIT_INTERACTIONS_SUCCESS;
  constructor(public data: any) {}
}

export class SubunitInteractionsFailure implements Action {
  readonly type = TargetRegistrationActionTypes.SUBUNIT_INTERACTIONS_FAILURE;
  constructor(public data: any) {}
}

export type All =
  | NewTarget
  | NewTargetSuccess
  | NewTargetFailure
  | SubunitInteractions
  | SubunitInteractionsSuccess
  | SubunitInteractionsFailure;
