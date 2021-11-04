import { ErrorClearAction, ErrorSetAction } from '../../reducers/errorReducer';

export type ActionCreatorSetError = (error: any) => ErrorSetAction;
export type ActionCreatorClearErrors = () => ErrorClearAction;
