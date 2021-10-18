import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM, EDIT_ITEM } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  dispatch(setItemsLoading());

  try {
    const response = await axios.get(`/api/items/${userId}`, tokenConfig(getState));
    console.log('response data get all items', response.data);
    dispatch({
      type: GET_ITEMS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(`/api/items/${itemId}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: itemId,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const addItem = (item) => async (dispatch, getState) => {
  const newItem = { ...item, user: getState().auth.user.id };
  // console.log('item in add action', newItem);
  dispatch(setItemsLoading());

  try {
    const response = await axios.post('/api/items/new', newItem, tokenConfig(getState));
    dispatch({
      type: ADD_ITEM,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});

export const getItem = (itemId) => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  dispatch(setItemsLoading());
  console.log('get item action runs');
  try {
    const response = await axios.get(`/api/items/${userId}/${itemId}`, tokenConfig(getState));
    console.log('get Item response', response.data);
    dispatch({
      type: GET_ITEM,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editItem = (item) => async (dispatch, getState) => {
  const newItem = { ...item, user: getState().auth.user.id };
  const userId = getState().auth.user.id;
  console.log('item in save action', newItem);
  dispatch(setItemsLoading());

  try {
    const response = await axios.patch(`/api/items/${userId}/${item._id}`, newItem, tokenConfig(getState));
    dispatch({
      type: EDIT_ITEM,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
