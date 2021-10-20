import { combineReducers } from 'redux';
import { AuthState } from './authReducer';
import itemReducer, { ItemState } from './itemReducer';
import errorReducer, { ErrorState } from './errorReducer';
import authReducer from './authReducer';

export interface AppState {
  item: ItemState;
  error: ErrorState;
  auth: AuthState;
}

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});
