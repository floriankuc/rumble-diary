import { Dispatch } from 'redux';
import { User } from '../entities/User';
import { AuthAction } from '../reducers/authReducer';
import { ErrorAction } from '../reducers/errorReducer';
import { ItemAction } from '../reducers/itemReducer';

export type StoreDispatch<T extends ItemAction | AuthAction | ErrorAction> = Dispatch<T>;
export interface TokenAndUser {
  token: string;
  user: User;
}

export interface ApiError {
  msg: string;
  status: string | number;
  id: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
