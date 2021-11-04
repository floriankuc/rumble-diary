import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { register } from '../actions/auth/authActions';
import { clearErrors } from '../actions/error/errorActions';
import { RegisterCredentials } from '../actions/types';
import Register from '../components/Register';
import { AppState } from '../reducers';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

class RegisterContainer extends React.Component<PropsFromRedux> {
  handleSubmit = (values: RegisterCredentials): void => {
    this.props.register(values);
  };

  componentDidMount(): void {
    if (this.props.authState.isAuthenticated) {
      history.push(APP_ROUTES.diary);
    }
  }

  componentWillUnmount(): void {
    this.props.clearErrors();
  }

  render(): ReactElement {
    return <Register handleSubmit={this.handleSubmit} msg={this.props.errorState.id === 'REGISTER_FAIL' && this.props.errorState.msg} />;
  }
}

const mapStateToProps = ({ authState, errorState }: AppState): Omit<AppState, 'itemState'> => ({
  authState,
  errorState,
});

const connector = connect(mapStateToProps, { register, clearErrors });

export default connector(RegisterContainer);
