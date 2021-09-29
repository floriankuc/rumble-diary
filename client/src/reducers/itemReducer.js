import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return { ...state, items: action.payload, loading: false };
    case DELETE_ITEM:
      return { ...state, items: state.items.filter((i) => i._id !== action.payload) };
    case ADD_ITEM:
      return { ...state, items: [action.payload, ...state.items] };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
