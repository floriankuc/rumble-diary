// import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM, EDIT_ITEM } from './types';
import axios from 'axios';
import { StoreDispatch, tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { AppState } from '../reducers';
import { ItemActionTypes } from './itemActionTypes';

export const getItems = () => async (dispatch: StoreDispatch, getState: () => AppState) => {
  const userId = getState().auth.user?.id;
  dispatch(setItemsLoading());

  try {
    const response = await axios.get(`/api/items/${userId}`, tokenConfig(getState));
    console.log('response data get all items', response.data);
    dispatch({
      type: ItemActionTypes.GET_ITEMS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteItem = (itemId: string) => async (dispatch: StoreDispatch, getState: () => AppState) => {
  try {
    const response = await axios.delete(`/api/items/${itemId}`, tokenConfig(getState));
    dispatch({
      type: ItemActionTypes.DELETE_ITEM,
      // payload: itemId,
    });
  } catch (error: any) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const addItem = (item: any) => async (dispatch: StoreDispatch, getState: () => AppState) => {
  const newItem = { ...item, user: getState().auth.user?.id };
  dispatch(setItemsLoading());

  try {
    const response = await axios.post('/api/items/new', newItem, tokenConfig(getState));
    dispatch({
      type: ItemActionTypes.ADD_ITEM,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const setItemsLoading = () => ({
  type: ItemActionTypes.ITEMS_LOADING,
});

export const getItem = (itemId: string) => async (dispatch: StoreDispatch, getState: () => AppState) => {
  const userId = getState().auth.user?.id;
  dispatch(setItemsLoading());
  try {
    const response = await axios.get(`/api/items/${userId}/${itemId}`, tokenConfig(getState));
    console.log('get Item response', response.data);
    dispatch({
      type: ItemActionTypes.GET_ITEM,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const editItem = (item: any) => async (dispatch: StoreDispatch, getState: () => AppState) => {
  const newItem = { ...item, user: getState().auth.user?.id };
  const userId = getState().auth.user?.id;
  dispatch(setItemsLoading());

  try {
    const response = await axios.patch(`/api/items/${userId}/${item._id}`, newItem, tokenConfig(getState));
    dispatch({
      type: ItemActionTypes.EDIT_ITEM,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
