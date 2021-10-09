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
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {
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

  return (
    <div>
      <Typography
        variant="h5"
        // className={classes.loginHeadline}
      >
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="filled"
          // className={classes.textfield}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="filled"
          // className={classes.textfield}
        />
        <Typography
        // className={classes.errorMsg}
        >
          {msg}
        </Typography>

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
