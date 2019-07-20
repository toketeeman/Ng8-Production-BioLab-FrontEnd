import { ISubunit } from "../../protein-expression.interface";
import { TargetRegistrationActionTypes, All } from "../actions/target.actions";

export interface State {
  target: string | null;
  subunits: ISubunit[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  target: null,
  subunits: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case TargetRegistrationActionTypes.NEW_TARGET_SUCCESS: {
      return {
        ...state,
        target: action.data.target,
        subunits: action.data.subunits,
        errorMessage: null
      };
    }
    case TargetRegistrationActionTypes.NEW_TARGET_FAILURE: {
      return {
        ...state,
        errorMessage: "Something went wrong. Please try again."
      };
    }
  }
}
