import axios, { AxiosResponse } from 'axios';
import { User } from '../../entities/User';
import { AppState } from '../../reducers';
import { AuthAction } from '../../reducers/authReducer';
import { ErrorAction } from '../../reducers/errorReducer';
import { ApiRoutes } from '../apiRoutes';
import { createErrorSetAction } from '../error/errorActions';
import { config, isApiError, tokenConfig } from '../helpers';
import { LoginCredentials, RegisterCredentials, StoreDispatch, TokenAndUser } from '../types';
import {
  createAuthErrorAction,
  createLoginAction,
  createLogoutAction,
  createRegisterSuccessAction,
  createUserLoadedAction,
  createUserLoadingAction,
} from './authActionCreators';

export const loadUser = () => async (dispatch: StoreDispatch<ErrorAction | AuthAction>, getState: () => AppState): Promise<void> => {
  dispatch(createUserLoadingAction());

  try {
    const response: AxiosResponse<User> = await axios.get(ApiRoutes.LOAD_USER, tokenConfig(getState));
    dispatch(createUserLoadedAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
      dispatch(createAuthErrorAction());
    }
  }
};

export const register = ({ name, email, password }: RegisterCredentials) => async (dispatch: StoreDispatch<AuthAction | ErrorAction>): Promise<void> => {
  const body = JSON.stringify({ name, email, password });

  try {
    const response: AxiosResponse<TokenAndUser> = await axios.post(ApiRoutes.REGISTER_USER, body, config);
    dispatch(createRegisterSuccessAction(response.data.token, response.data.user));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
      dispatch(createAuthErrorAction());
    }
  }
};

export const login = ({ email, password }: LoginCredentials) => async (dispatch: StoreDispatch<AuthAction | ErrorAction>): Promise<void> => {
  const body = JSON.stringify({ email, password });

  try {
    const response: AxiosResponse<TokenAndUser> = await axios.post(ApiRoutes.LOGIN_USER, body, config);
    dispatch(createLoginAction(response.data.token, response.data.user));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
      dispatch(createAuthErrorAction());
    }
  }
};

export const logout = () => async (dispatch: StoreDispatch<AuthAction>): Promise<void> => {
  dispatch(createUserLoadingAction());
  dispatch(createLogoutAction());
};
