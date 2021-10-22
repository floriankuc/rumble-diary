import axios from 'axios';
import { StoreDispatch, tokenConfig } from './authActions';
import { AppState } from '../reducers';
import { ItemActionTypes } from './itemActionTypes';
import { ErrorActionTypes } from './errorActionTypes';

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
    dispatch({
      type: ErrorActionTypes.GET_ERRORS,
      payload: { msg: error.response.data, status: error.response.status, id: 'GET_ITEMS_FAIL' },
    });
  }
};

export const deleteItem = (itemId: string) => async (dispatch: StoreDispatch, getState: () => AppState) => {
  dispatch(setItemsLoading());

  try {
    const response = await axios.delete(`/api/items/${itemId}`, tokenConfig(getState));
    dispatch({
      type: ItemActionTypes.DELETE_ITEM,
      payload: response.data.id,
    });
  } catch (error: any) {
    dispatch({
      type: ErrorActionTypes.GET_ERRORS,
      payload: { msg: error.response.data, status: error.response.status, id: 'DELETE_ITEM_FAIL' },
    });
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
    dispatch({
      type: ErrorActionTypes.GET_ERRORS,
      payload: { msg: error.response.data, status: error.response.status, id: 'ADD_ITEM_FAIL' },
    });
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
    dispatch({
      type: ErrorActionTypes.GET_ERRORS,
      payload: { msg: error.response.data, status: error.response.status, id: 'GET_ITEM_FAIL' },
    });
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
    dispatch({
      type: ErrorActionTypes.GET_ERRORS,
      payload: { msg: error.response.data, status: error.response.status, id: 'EDIT_ITEM_FAIL' },
    });
  }
};
