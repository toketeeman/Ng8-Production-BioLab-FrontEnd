import {
  InteractionsRegistrationActionTypes,
  All
} from "../actions/interactions.actions";

export interface State {
  interactions: any[] | null;
  ptms: any[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  interactions: null,
  ptms: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_SUCCESS: {
      return {
        ...state,
        interactions: action.data.interactions,
        ptms: action.data.ptms,
        errorMessage: null
      };
    }
    case InteractionsRegistrationActionTypes.SUBUNIT_INTERACTIONS_FAILURE: {
      return {
        ...state,
        errorMessage: "Interactions could not be saved. Please try again."
      };
    }
    default:
      return state;
  }
}
