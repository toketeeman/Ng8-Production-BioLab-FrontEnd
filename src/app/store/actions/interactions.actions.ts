import { Action } from "@ngrx/store";

export enum InteractionsRegistrationActionTypes {
  SUBUNIT_INTERACTIONS = "[Subunit Interactions] Registration",
  SUBUNIT_INTERACTIONS_SUCCESS = "[Subunit Interactions] Registration Success",
  SUBUNIT_INTERACTIONS_FAILURE = "[Subunit Interactions] Registration Failure"
}

export class SubunitInteractions implements Action {
  readonly type = InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS;
  constructor(public data: any) {}
}

export class SubunitInteractionsSuccess implements Action {
  readonly type =
    InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_SUCCESS;
  constructor(public data: any) {}
}

export class SubunitInteractionsFailure implements Action {
  readonly type =
    InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_FAILURE;
  constructor(public data: any) {}
}

export type All =
  | SubunitInteractions
  | SubunitInteractionsSuccess
  | SubunitInteractionsFailure;
