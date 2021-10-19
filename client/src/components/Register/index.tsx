import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export interface RegisterProps {
  handleSubmit: (values: any) => void;
  msg: ReactNode;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const Register = (props: RegisterProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.handleSubmit(values);
    },
  });

  return (
    <div>
      <Typography
        variant="h5"
        // className={classes.loginHeadline}
      >
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
          variant="outlined"
          // className={classes.textfield}
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
          variant="outlined"
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
          variant="outlined"
          // className={classes.textfield}
        />
        <Typography
        // className={classes.errorMsg}
        >
          {props.msg}
        </Typography>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
