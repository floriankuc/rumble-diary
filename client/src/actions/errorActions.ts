import { ActionCreatorClearErrors, ActionCreatorSetError } from './errorActionCreators';
import { ErrorActionTypes } from './errorActionTypes';

export const createErrorSetAction: ActionCreatorSetError = (error) => {
  return { type: ErrorActionTypes.GET_ERRORS, payload: error };
};

export const clearErrors: ActionCreatorClearErrors = () => ({ type: ErrorActionTypes.CLEAR_ERRORS });
