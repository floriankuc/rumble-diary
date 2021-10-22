import { ItemActionTypes } from '../actions/itemActionTypes';
import { FormNight, Night } from '../entities/Night';

export interface ItemActionGeneral {
  //comment into ItemAction if problems
  type: ItemActionTypes;
  payload: any;
}

export interface ItemGetAllAction {
  type: ItemActionTypes.GET_ITEMS;
  payload: Night[];
}

export interface ItemLoadingAction {
  type: ItemActionTypes.ITEMS_LOADING;
}

export interface ItemDeleteAction {
  type: ItemActionTypes.DELETE_ITEM;
  payload: string;
}

export interface ItemAddAction {
  type: ItemActionTypes.ADD_ITEM;
  payload: Night;
}

export interface ItemGetAction {
  type: ItemActionTypes.GET_ITEM;
  payload: Night[]; //achtung, get single item gibt mir arra yzurück?
}
export interface ItemEditAction {
  type: ItemActionTypes.EDIT_ITEM;
  payload: Night; //achtung, get single item gibt mir arra yzurück?
}

export type ItemAction = ItemLoadingAction | ItemGetAllAction | ItemDeleteAction | ItemAddAction | ItemGetAction | ItemEditAction;

export type ItemState = ItemNullState | ItemGeneralState;

export interface ItemGeneralState {
  items: Night[];
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
      return { ...state, items: action.payload, loading: false, success: false };
    case ItemActionTypes.DELETE_ITEM:
      return { ...state, items: state.items.filter((i: any) => i._id !== action.payload), loading: false, success: true };
    case ItemActionTypes.ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, success: true };
    case ItemActionTypes.GET_ITEM:
      return { ...state, items: action.payload, loading: false, success: false };
    case ItemActionTypes.EDIT_ITEM:
      return { ...state, items: [action.payload], loading: false, success: true };
    case ItemActionTypes.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
