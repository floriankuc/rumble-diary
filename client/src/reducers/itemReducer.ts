import { ItemActionTypes } from '../actions/item/itemActionTypes';
import { Entry } from '../entities/Night';

export interface ItemActionGeneral {
  type: ItemActionTypes;
  payload: any;
}

export interface ItemGetAllAction {
  type: ItemActionTypes.GET_ITEMS;
  payload: Entry[];
}

export interface ItemsLoadingAction {
  type: ItemActionTypes.ITEMS_LOADING;
}

export interface ItemDeleteAction {
  type: ItemActionTypes.DELETE_ITEM;
  payload: string;
}

export interface ItemAddAction {
  type: ItemActionTypes.ADD_ITEM;
  payload: Entry;
}

export interface ItemGetAction {
  type: ItemActionTypes.GET_ITEM;
  payload: Entry[];
}
export interface ItemEditAction {
  type: ItemActionTypes.EDIT_ITEM;
  payload: Entry;
}

export interface ItemErrorAction {
  type: ItemActionTypes.ITEMS_ERROR;
}
export type ItemAction = ItemsLoadingAction | ItemGetAllAction | ItemDeleteAction | ItemAddAction | ItemGetAction | ItemEditAction | ItemErrorAction;

export type ItemState = ItemNullState | ItemGeneralState;

export interface ItemGeneralState {
  items: Entry[];
  loading: boolean;
  success: boolean;
}
export interface ItemNullState {
  items: [];
  loading: boolean;
  success: boolean;
}

const initialState: ItemNullState = {
  items: [],
  loading: false,
  success: false,
};

export default function itemReducer(state = initialState, action: ItemAction): ItemState {
  switch (action.type) {
    case ItemActionTypes.GET_ITEMS:
      return { ...state, items: action.payload, loading: false, success: true };
    case ItemActionTypes.DELETE_ITEM:
      return { ...state, items: state.items.filter((i: any) => i._id !== action.payload), loading: false, success: false };
    case ItemActionTypes.ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, success: false };
    case ItemActionTypes.GET_ITEM:
      return { ...state, items: action.payload, loading: false, success: false };
    case ItemActionTypes.EDIT_ITEM:
      return { ...state, items: [action.payload], loading: false, success: false };
    case ItemActionTypes.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ItemActionTypes.ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
