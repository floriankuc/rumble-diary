import { combineReducers } from 'redux';
import { AuthState } from './authReducer';
import itemReducer, { ItemState } from './itemReducer';
import errorReducer, { ErrorState } from './errorReducer';
import authReducer from './authReducer';

export interface AppState {
  itemState: ItemState;
  errorState: ErrorState;
  authState: AuthState;
}

export default combineReducers({
  itemState: itemReducer,
  errorState: errorReducer,
  authState: authReducer,
});
