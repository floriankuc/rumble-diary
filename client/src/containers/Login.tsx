import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../actions/auth/authActions';
import { clearErrors } from '../actions/error/errorActions';
import { LoginCredentials } from '../actions/types';
import Login from '../components/Login';
import { AppState } from '../reducers';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

class LoginContainer extends React.Component<PropsFromRedux> {
  handleSubmit = (values: LoginCredentials): void => {
    this.props.login(values);
    this.props.clearErrors();
  };

  componentDidMount(): void {
    if (this.props.authState.isAuthenticated) {
      history.push(APP_ROUTES.diary);
    }
  }

  render(): ReactElement {
    return <Login msg={this.props.errorState.msg} handleSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = ({ authState, errorState }: AppState): Omit<AppState, 'itemState'> => ({
  authState,
  errorState,
});

const connector = connect(mapStateToProps, { login, clearErrors });

export default connector(LoginContainer);
