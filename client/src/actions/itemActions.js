import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  dispatch(setItemsLoading());

  try {
    const response = await axios.get(`/api/items/${userId}`, tokenConfig(getState));
    dispatch({
      type: GET_ITEM,
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
  dispatch(setItemsLoading());

  try {
    const response = await axios.post('/api/items', newItem, tokenConfig(getState));
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
