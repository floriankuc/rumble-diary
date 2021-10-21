import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Register from '../components/Register';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';
import { RegisterCredentials } from '../actions/authActions';
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface RegisterReduxProps extends PropsFromRedux {
  isAuthenticated: boolean;
  error: any;
}

export interface RegisterModalProps {
  clearErrors: () => { type: string };
}
class RegisterContainer extends React.Component<RegisterModalProps & RegisterReduxProps> {
  state = { msg: null };

  handleSubmit = (values: RegisterCredentials) => {
    this.props.register({ name: values.name, email: values.email, password: values.password });
    clearErrors();
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push(APP_ROUTES.start);
    }
    if (this.props.error.id === 'LOGIN_FAIL') {
      this.setState({ msg: this.props.error.msg.msg });
    } else {
      this.setState({ msg: null });
    }
  }

  render() {
    return <Register handleSubmit={this.handleSubmit} msg={this.state.msg} />;
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const connector = connect(mapStateToProps, { register, clearErrors });

export default connector(RegisterContainer);
