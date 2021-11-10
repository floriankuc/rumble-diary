import { Entry } from '../../entities/Entry';
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
export type ActionCreatorGetAllItems = (entries: Entry[]) => ItemGetAllAction;
export type ActionCreatorDeleteItem = (id: Entry['_id']) => ItemDeleteAction;
export type ActionCreatorAddItem = (entry: Entry) => ItemAddAction;
export type ActionCreatorEditItem = (entry: Entry) => ItemEditAction;
export type ActionCreatorGetItem = (entries: Entry[]) => ItemGetAction;
export type ActionCreatorItemsError = () => ItemErrorAction;

export const createItemsLoadingAction: ActionCreatorItemsLoading = () => ({ type: ItemActionTypes.ITEMS_LOADING });
export const createItemsGetAction: ActionCreatorGetAllItems = (entries) => ({ type: ItemActionTypes.GET_ITEMS, payload: entries });
export const createItemDeleteAction: ActionCreatorDeleteItem = (id) => ({ type: ItemActionTypes.DELETE_ITEM, payload: id });
export const createItemAddAction: ActionCreatorAddItem = (entry) => ({ type: ItemActionTypes.ADD_ITEM, payload: entry });
export const createEditItemAction: ActionCreatorEditItem = (entry) => ({ type: ItemActionTypes.EDIT_ITEM, payload: entry });
export const createGetItemAction: ActionCreatorGetItem = (entries) => ({ type: ItemActionTypes.GET_ITEM, payload: entries });
export const createItemsErrorAction: ActionCreatorItemsError = () => ({ type: ItemActionTypes.ITEMS_ERROR });
