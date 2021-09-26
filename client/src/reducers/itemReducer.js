import uuid from 'uuid';
import { GET_ITEM, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [
    // { id: uuid(), name: 'eggs' },
    // { id: uuid(), name: 'eggs2' },
    // { id: uuid(), name: 'eggs3' },
    // { id: uuid(), name: 'eggs4' },
  ],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return { ...state, items: action.payload, loading: false };
    case DELETE_ITEM:
      console.log('deleting in reducer');
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
