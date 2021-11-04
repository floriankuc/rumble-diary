import { Night } from '../../entities/Night';
import {
  ItemAddAction,
  ItemDeleteAction,
  ItemEditAction,
  ItemErrorAction,
  ItemGetAction,
  ItemGetAllAction,
  ItemsLoadingAction,
} from '../../reducers/itemReducer';
import { ItemActionTypes } from './itemActionTypes';

export type ActionCreatorItemsLoading = () => ItemsLoadingAction;
export type ActionCreatorGetAllItems = (nights: Night[]) => ItemGetAllAction;
export type ActionCreatorDeleteItem = (id: Night['_id']) => ItemDeleteAction;
export type ActionCreatorAddItem = (night: Night) => ItemAddAction;
export type ActionCreatorEditItem = (night: Night) => ItemEditAction;
export type ActionCreatorGetItem = (nights: Night[]) => ItemGetAction;
export type ActionCreatorItemsError = () => ItemErrorAction;

export const createItemsLoadingAction: ActionCreatorItemsLoading = () => ({ type: ItemActionTypes.ITEMS_LOADING });
export const createItemsGetAction: ActionCreatorGetAllItems = (nights) => ({ type: ItemActionTypes.GET_ITEMS, payload: nights });
export const createItemDeleteAction: ActionCreatorDeleteItem = (id) => ({ type: ItemActionTypes.DELETE_ITEM, payload: id });
export const createItemAddAction: ActionCreatorAddItem = (night) => ({ type: ItemActionTypes.ADD_ITEM, payload: night });
export const createEditItemAction: ActionCreatorEditItem = (night) => ({ type: ItemActionTypes.EDIT_ITEM, payload: night });
export const createGetItemAction: ActionCreatorGetItem = (nights) => ({ type: ItemActionTypes.GET_ITEM, payload: nights });
export const createItemsErrorAction: ActionCreatorItemsError = () => ({ type: ItemActionTypes.ITEMS_ERROR });
