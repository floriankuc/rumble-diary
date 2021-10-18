import { GET_ITEMS, GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, EDIT_ITEM } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  success: false,
  editSuccess: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload, loading: false, success: false };
    case DELETE_ITEM:
      return { ...state, items: state.items.filter((i) => i._id !== action.payload) };
    case ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, success: true };
    case GET_ITEM:
      return { ...state, items: action.payload, loading: false, success: true };
    case EDIT_ITEM:
      return { ...state, items: [action.payload, ...state.items], loading: false, editSuccess: true };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
