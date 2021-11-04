import axios from 'axios';
import { AppState } from '../reducers';

export type Config = {
  headers: {
    [key: string]: string;
  };
  'x-auth-token'?: string;
};

export const config: Config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const tokenConfig = (getState: () => AppState): Config => {
  const token: string = getState().authState.token;
  return { ...config, headers: { ...config.headers, 'x-auth-token': token } };
};

export const isApiError = (error: any): boolean => axios.isAxiosError(error);
