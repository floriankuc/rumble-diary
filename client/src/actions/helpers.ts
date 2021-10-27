import axios from 'axios';
import { AppState } from '../reducers';

export const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const tokenConfig = (getState: () => AppState) => {
  const token: string = getState().auth.token;
  return { ...config, headers: { ...config.headers, 'x-auth-token': token } };
};

export const isApiError = (error: any): boolean => axios.isAxiosError(error);
