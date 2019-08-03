import { ISubunit } from "../../protein-expression.interface";
import { TargetRegistrationActionTypes, All } from "../actions/target.actions";

export interface State {
  target: string;
  partner: string;
  protein_class_pk: number;
  notes: string;
  project_name: string;
  subunits: ISubunit[];
  errorMessage: string;
}

export const initialState: State = {
  target: null,
  partner: null,
  protein_class_pk: null,
  notes: null,
  project_name: null,
  subunits: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case TargetRegistrationActionTypes.NEW_TARGET_SUCCESS: {
      return {
        ...state,
        target: action.data.target,
        partner: action.data.partner,
        protein_class_pk: action.data.protein_class_pk,
        notes: action.data.notes,
        project_name: action.data.project_name,
        subunits: action.data.subunits,
        errorMessage: null
      };
    }
    case TargetRegistrationActionTypes.NEW_TARGET_FAILURE: {
      return {
        ...state,
        errorMessage: "Target could not be registered. Please try again."
      };
    }
    default:
      return state;
  }
}
