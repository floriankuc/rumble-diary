import { AuthActionTypes } from '../actions/authActionTypes';
import { TokenAndUser } from '../actions/types';
import { User } from '../entities/User';

export interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR | AuthActionTypes.REGISTER_FAIL | AuthActionTypes.USER_LOADING | AuthActionTypes.LOGIN_FAIL;
}

export interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: TokenAndUser;
}

export interface AuthValidAction {
  type: AuthActionTypes;
  payload: {
    token: null | string;
    isLoading: null | boolean;
    isAuthenticated: boolean;
    user: null | User;
  };
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: TokenAndUser;
}

export interface UserLoadedAction {
  type: AuthActionTypes.USER_LOADED;
  payload: User;
}

export interface UserLoadingAction {
  type: AuthActionTypes.USER_LOADING;
}

export interface UserLogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}

export type AuthAction =
  | AuthErrorAction
  | AuthValidAction
  | RegisterSuccessAction
  | UserLoadedAction
  | UserLoadingAction
  | UserLogoutSuccessAction
  | LoginSuccessAction;

export interface AuthUserLoadedState {
  token: any;
  isAuthenticated: any;
  isLoading: any;
  user: User;
}
export interface AuthUserNotLoadingState {
  token: null;
  isAuthenticated: null;
  isLoading: boolean;
  user: null;
}

export interface AuthUserLoadingState {
  token: null;
  isAuthenticated: null;
  isLoading: true;
  user: null;
}
export interface AuthUserLoadingFalseState {
  token: null;
  isAuthenticated: boolean;
  isLoading: true;
  user: null;
}

export interface AuthNullState {
  token: null;
  isAuthenticated: false;
  isLoading: false;
  user: null;
}

export interface AuthValidState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null;
}

export interface WHATEVER {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
}

export type AuthState =
  | AuthUserLoadedState
  | AuthValidState
  | AuthNullState
  | AuthUserLoadingState
  | AuthUserNotLoadingState
  | AuthUserLoadingFalseState
  | WHATEVER;

const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function authReducer(state = initialAuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.USER_LOADING:
      console.log('user loading runs');
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.USER_LOADED:
      console.log('user loaded runs');
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload, //user wird hier durch id gesetzt weil ich nur id brauche?
        // user: action.payload, //user wird hier durch id gesetzt weil ich nur id brauche?
      } as AuthUserLoadedState;
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      console.log('login user', action.payload.user);
      if (action.payload) {
        localStorage.setItem('token', action.payload.token as string);
      }
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT_SUCCESS:
    case AuthActionTypes.REGISTER_FAIL:
      console.log('case mit removeToken action fires');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
