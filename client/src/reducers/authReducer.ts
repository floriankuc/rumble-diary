// import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authActionTypes';

import { AuthActionTypes } from '../actions/authActionTypes';

export interface AuthAction {
  type: AuthActionTypes;
  payload?: {
    token: null | string;
    isLoading: null | boolean;
    isAuthenticated: boolean;
    user: null | string;
  };
}

export interface AuthState {
  token: null | string;
  isAuthenticated: null | boolean;
  isLoading: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    register_date: Date;
  } | null;
}

const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function authReducer(state = initialAuthState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      if (action.payload) {
        localStorage.setItem('token', action.payload.token as string);
      }
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT_SUCCESS:
    case AuthActionTypes.REGISTER_FAIL:
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
