// import { GET_ITEMS, GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, EDIT_ITEM } from '../actions/types';
import { ItemActionTypes } from '../actions/itemActionTypes';

export interface ItemAction {
  type: ItemActionTypes;
  payload?: ItemState;
}

export interface ItemState {
  items: [];
  loading: boolean;
  success: boolean;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  success: false,
};

export default function itemReducer(state = initialState, action: ItemAction) {
  switch (action.type) {
    case ItemActionTypes.GET_ITEMS:
      return { ...state, items: action.payload, loading: false, success: false };
    case ItemActionTypes.DELETE_ITEM:
      return { ...state, items: state.items.filter((i: any) => i._id !== action.payload) };
    case ItemActionTypes.ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, success: true };
    case ItemActionTypes.GET_ITEM:
      return { ...state, items: action.payload, loading: false, success: false };
    case ItemActionTypes.EDIT_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, success: true };
    case ItemActionTypes.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
