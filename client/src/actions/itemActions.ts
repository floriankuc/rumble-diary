import axios, { AxiosResponse } from 'axios';
import { AppState } from '../reducers';
import { ItemActionTypes } from './itemActionTypes';
import { ErrorActionTypes } from './errorActionTypes';
import { ItemAction } from '../reducers/itemReducer';
import { StoreDispatch } from './types';
import { isApiError, tokenConfig } from './helpers';
import { createEditItemAction, createItemAddAction, createItemDeleteAction, createItemsGetAction, createItemsLoadingAction } from './itemActionCreators';
import { Night } from '../entities/Night';
import { createErrorSetAction } from './errorActions';
import { ErrorAction } from '../reducers/errorReducer';

export const setItemsLoading = async (dispatch: StoreDispatch<ItemAction>): Promise<void> => {
  dispatch(createItemsLoadingAction());
};

export const getItems = () => async (dispatch: StoreDispatch<ItemAction | ErrorAction>, getState: () => AppState) => {
  const userId = getState().auth.user?.id;
  dispatch(createItemsLoadingAction());

  try {
    const response: AxiosResponse<Night[]> = await axios.get(`/api/items/${userId}`, tokenConfig(getState));
    dispatch(createItemsGetAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const deleteItem = (itemId: string) => async (dispatch: StoreDispatch<ItemAction | ErrorAction>, getState: () => AppState) => {
  dispatch(createItemsLoadingAction());

  try {
    const response: AxiosResponse<Night> = await axios.delete(`/api/items/${itemId}`, tokenConfig(getState));
    dispatch(createItemDeleteAction(response.data._id));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const addItem = (item: any) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const newItem = { ...item, user: getState().auth.user?.id };
  dispatch(createItemsLoadingAction());

  try {
    const response = await axios.post('/api/items/new', newItem, tokenConfig(getState));
    dispatch(createItemAddAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const editItem = (item: any) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const newItem = { ...item, user: getState().auth.user?.id };
  const userId = getState().auth.user?.id;
  dispatch(createItemsLoadingAction());

  try {
    const response = await axios.patch(`/api/items/${userId}/${item._id}`, newItem, tokenConfig(getState));
    dispatch(createEditItemAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const getItem = (itemId: string) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const userId = getState().auth.user?.id;
  dispatch(createItemsLoadingAction());

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
