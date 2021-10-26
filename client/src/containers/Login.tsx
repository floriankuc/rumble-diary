import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Login from '../components/Login';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface LoginModalProps {
  // login: ({ email, password }: { email: any; password: any }) => (dispatch: Promise<void>) => Promise<void>;
  clearErrors: () => { type: string };
}

export interface LoginReduxProps extends PropsFromRedux {
  isAuthenticated: boolean;
  error: any;
}

class LoginModal extends React.Component<LoginModalProps & LoginReduxProps> {
  state = { msg: null };

  handleSubmit = (values: any) => {
    this.props.login({ email: values.email, password: values.password });
    clearErrors();
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push(APP_ROUTES.diary);
    }
    if (this.props.error.id === 'LOGIN_FAIL') {
      this.setState({ msg: this.props.error.msg.msg });
    } else {
      this.setState({ msg: null });
    }
  }

  render() {
    return <Login msg={this.state.msg} handleSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const connector = connect(mapStateToProps, { login, clearErrors });

export default connector(LoginModal);
