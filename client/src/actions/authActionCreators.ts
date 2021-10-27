import { User } from '../entities/User';
import {
  AuthErrorAction,
  LoginSuccessAction,
  RegisterSuccessAction,
  UserLoadedAction,
  UserLoadingAction,
  UserLogoutSuccessAction,
} from '../reducers/authReducer';
import { AuthActionTypes } from './authActionTypes';

export type ActionCreatorUserLoaded = (user: User) => UserLoadedAction;
export type ActionCreatorUserLoading = () => UserLoadingAction;
export type ActionCreatorRegisterSuccessAction = (token: string, user: User) => RegisterSuccessAction;
export type ActionCreatorAuthError = () => AuthErrorAction;
export type ActionCreatorLogout = () => UserLogoutSuccessAction;
export type ActionCreatorLogin = (token: string, user: User) => LoginSuccessAction;

export const createUserLoadedAction: ActionCreatorUserLoaded = (user) => ({ type: AuthActionTypes.USER_LOADED, payload: user });
export const createUserLoadingAction: ActionCreatorUserLoading = () => ({ type: AuthActionTypes.USER_LOADING });
export const createAuthErrorAction: ActionCreatorAuthError = () => ({ type: AuthActionTypes.AUTH_ERROR });
export const createRegisterErrorAction: ActionCreatorAuthError = () => ({ type: AuthActionTypes.REGISTER_FAIL });
export const createRegisterSuccessAction: ActionCreatorRegisterSuccessAction = (token, user) => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  payload: { token, user },
});
export const createLogoutAction: ActionCreatorLogout = () => ({ type: AuthActionTypes.LOGOUT_SUCCESS });
export const createLoginAction: ActionCreatorLogin = (token, user) => ({ type: AuthActionTypes.LOGIN_SUCCESS, payload: { token, user } });
