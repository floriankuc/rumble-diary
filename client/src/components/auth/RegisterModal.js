import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import { register } from '../../actions/authActions';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { APP_ROUTES } from '../../routes';

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
  name: yup.string('Enter a name').required('Name is required'),
  email: yup.string('Enter an email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter a password').min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const classes = useStyles();
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

  return (
    <div>
      <Typography variant="h5" className={classes.loginHeadline}>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          className={classes.textfield}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="standard"
          className={classes.textfield}
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
          variant="standard"
          className={classes.textfield}
        />
        <Typography className={classes.errorMsg}>{msg}</Typography>
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

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
