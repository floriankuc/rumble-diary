import { ErrorActionTypes } from '../actions/errorActionTypes';

export interface ErrorAction {
  type: ErrorActionTypes;
  payload: ErrorState;
}

//HIER SCHAUEN TODO ACHTUNG CHECKEN
export interface ErrorState {
  msg: {} | string;
  status: string | number | null;
  id: string | null;
}

const initialErrorState: ErrorState = {
  msg: {},
  status: null,
  id: null,
};

export default function errorReducer(state = initialErrorState, action: ErrorAction) {
  switch (action.type) {
    case ErrorActionTypes.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case ErrorActionTypes.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
