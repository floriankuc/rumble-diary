import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => (dispatch, getState) => {
  const userIdFromState = getState().auth.user.id;
  dispatch(setItemsLoading());
  axios
    .get(`/api/items/${userIdFromState}`, tokenConfig(getState))
    .then((res) => {
      console.log('res.data', res.data);
      dispatch({
        type: GET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (item) => (dispatch, getState) => {
  const newItem = { ...item, user: getState().auth.user.id };
  console.log('newItem', newItem);
  axios
    .post('/api/items', newItem, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
