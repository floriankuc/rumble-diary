import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { APP_ROUTES } from '../routes';
import { register } from '../actions/authActions';
import Register from '../components/Register';

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
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const RegisterContainer = ({ isAuthenticated, error, register, clearErrors }: any) => {
  // const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: '',
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
      register({ name: values.name, email: values.email, password: values.password });

      clearErrors();
    },
    [clearErrors, register]
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push(APP_ROUTES.start);
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error, isAuthenticated]);

  return <Register handleSubmit={handleSubmit} msg={msg} />;
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterContainer);
