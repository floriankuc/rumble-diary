import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  return { ...config, headers: { ...config.headers, 'x-auth-token': token } };
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const response = await axios.get('/api/auth/user', tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const logout = () => ({
  type: LOGOUT_SUCCESS,
});

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });

    try {
      const response = await axios.post('/api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
