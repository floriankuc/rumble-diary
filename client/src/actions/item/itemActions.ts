import axios, { AxiosResponse } from 'axios';
import {
  createEditItemAction,
  createGetItemAction,
  createItemAddAction,
  createItemDeleteAction,
  createItemsGetAction,
  createItemsLoadingAction,
} from './itemActionCreators';
import { AppState } from '../../reducers';
import { ItemAction } from '../../reducers/itemReducer';
import { StoreDispatch } from '../types';
import { isApiError, tokenConfig } from '../helpers';
import { Night } from '../../entities/Night';
import { createErrorSetAction } from '../error/errorActions';
import { ErrorAction } from '../../reducers/errorReducer';
import { ApiRoutes, getAuthRoute, getItemRoute, getItemsRoute } from '../apiRoutes';

export const setItemsLoading = async (dispatch: StoreDispatch<ItemAction>): Promise<void> => {
  dispatch(createItemsLoadingAction());
};

export const getItems = () => async (dispatch: StoreDispatch<ItemAction | ErrorAction>, getState: () => AppState) => {
  const userId = getState().authState.user?.id;
  dispatch(createItemsLoadingAction());

  try {
    const response: AxiosResponse<Night[]> = await axios.get(getAuthRoute(userId), tokenConfig(getState));
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
    const response: AxiosResponse<Night> = await axios.delete(getItemsRoute(itemId), tokenConfig(getState));
    dispatch(createItemDeleteAction(response.data._id));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const addItem = (item: any) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const newItem = { ...item, user: getState().authState.user?.id };
  dispatch(createItemsLoadingAction());

  try {
    const response = await axios.post(ApiRoutes.NEW_ITEM, newItem, tokenConfig(getState));
    dispatch(createItemAddAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const editItem = (item: any) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const newItem = { ...item, user: getState().authState.user?.id };
  const userId = getState().authState.user?.id;
  dispatch(createItemsLoadingAction());

  try {
    const response = await axios.patch(getItemRoute(item._id, userId), newItem, tokenConfig(getState));
    dispatch(createEditItemAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};

export const getItem = (itemId: string) => async (dispatch: StoreDispatch<any>, getState: () => AppState) => {
  const userId = getState().authState.user?.id;
  dispatch(createItemsLoadingAction());

  try {
    const response = await axios.get(getItemRoute(itemId, userId), tokenConfig(getState));
    console.log('item action get item response', response.data);
    dispatch(createGetItemAction(response.data));
  } catch (error: any) {
    if (isApiError(error)) {
      dispatch(createErrorSetAction(error.response));
    }
  }
};
