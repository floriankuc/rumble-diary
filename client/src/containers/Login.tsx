import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { login } from '../actions/authActions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { APP_ROUTES } from '../routes';
import Login from '../components/Login';

const useStyles = makeStyles({
  textfield: {
    marginBottom: 32,
  },
  errorMsg: {
    marginBottom: 32,
    color: 'red',
  },
  loginHeadline: {
    marginBottom: 32,
  },
});

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

export interface LoginModalProps {
  isAuthenticated: boolean;
  error: any;
  login: ({ email, password }: { email: any; password: any }) => (dispatch: any) => Promise<void>;
  clearErrors: () => { type: string };
}

const LoginModal = ({ isAuthenticated, error, login, clearErrors }: any) => {
  // const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

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
