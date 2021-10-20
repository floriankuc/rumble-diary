import { ErrorActionTypes } from './errorActionTypes';

export const returnErrors = (msg: string, status: string | number, id: string | null = null) => {
  return {
    type: ErrorActionTypes.GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => ({
  type: ErrorActionTypes.CLEAR_ERRORS,
});
