import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Login from '../components/Login';
import { APP_ROUTES } from '../routes';

export interface LoginModalProps {
  isAuthenticated: boolean;
  error: any;
  login: ({ email, password }: { email: any; password: any }) => (dispatch: any) => Promise<void>;
  clearErrors: () => { type: string };
}

const LoginModal = ({ isAuthenticated, error, login, clearErrors }: any) => {
  const history = useHistory();
  const [msg, setMsg] = useState(null);

  const handleSubmit = useCallback(
    (values) => {
      login({ email: values.email, password: values.password });

      clearErrors();
    },
    [clearErrors, login]
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push(APP_ROUTES.start);
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error, isAuthenticated]);

  return <Login msg={msg} handleSubmit={handleSubmit} />;
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
