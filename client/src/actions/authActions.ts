import axios from 'axios';
import { returnErrors } from './errorActions';
import { AuthActionTypes } from './authActionTypes';
import { AppState } from '../reducers';
import store from '../store';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export type StoreDispatch = typeof store.dispatch;

export const tokenConfig = (getState: () => AppState) => {
  const token = getState().auth.token;
  return { ...config, headers: { ...config.headers, 'x-auth-token': token } };
};

export const loadUser = () => async (dispatch: StoreDispatch, getState: () => AppState) => {
  dispatch({ type: AuthActionTypes.USER_LOADING }); //1. versuche user zu laden

  try {
    const response = await axios.get('/api/auth/user', tokenConfig(getState));
    console.log('loadUser response', response.data);
    dispatch({ type: AuthActionTypes.USER_LOADED, payload: response.data });
  } catch (error: any) {
    console.log('loadUser fails');
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
    });
  }
};

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const register =
  ({ name, email, password }: RegisterCredentials) =>
  async (dispatch: StoreDispatch) => {
    const body = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post('/api/users', body, config);
      console.log('register response', response.data);
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL,
      });
    }
  };

export const logout = () => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

export const login =
  ({ email, password }: LoginCredentials) =>
  async (dispatch: StoreDispatch) => {
    const body = JSON.stringify({ email, password });

    try {
      const response = await axios.post('/api/auth', body, config);
      console.log('login response', response.data);
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      console.log('login fail fires');
      dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
      });
    }
  };
