import { ErrorActionTypes } from '../actions/errorActionTypes';

// export interface ErrorAction {
//   type: ErrorActionTypes;
//   payload: ErrorState;
// }

//HIER SCHAUEN TODO ACHTUNG CHECKEN
export interface ErrorAnyState {
  msg: string;
  status: string | number;
  id: string;
}

export interface ErrorNullState {
  msg: null;
  status: null;
  id: null;
}

export interface ErrorClearAction {
  type: ErrorActionTypes.CLEAR_ERRORS;
  payload: {
    msg: null;
    status: null;
    id: null;
  };
}

export interface ErrorSetAction {
  type: ErrorActionTypes.GET_ERRORS;
  payload: {
    msg: string;
    status: string | number;
    id: string;
  };
}

export type ErrorAction = ErrorClearAction | ErrorSetAction;

export type ErrorState = ErrorAnyState | ErrorNullState;

const initialErrorState: ErrorNullState = {
  msg: null,
  status: null,
  id: null,
};

export default function errorReducer(state = initialErrorState, action: ErrorAction): ErrorState {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case ErrorActionTypes.CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
