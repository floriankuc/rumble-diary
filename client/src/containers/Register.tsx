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
  handleSubmit = (values: RegisterCredentials) => {
    this.props.register({ name: values.name, email: values.email, password: values.password });
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push(APP_ROUTES.diary);
    }
  }

  componentWillUnmount() {
    console.log('register unmounts');
    clearErrors();
  }

  render() {
    return <Register handleSubmit={this.handleSubmit} msg={this.props.error.id === 'REGISTER_FAIL' && this.props.error.msg.msg} />;
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const connector = connect(mapStateToProps, { register, clearErrors });

export default connector(RegisterContainer);
