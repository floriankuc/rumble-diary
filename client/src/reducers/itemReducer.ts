import { ItemActionTypes } from '../actions/itemActionTypes';

export interface ItemAction {
  type: ItemActionTypes;
  payload?: ItemState | string;
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
      return { ...state, items: state.items.filter((i: any) => i._id !== action.payload), loading: false, success: true };
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
