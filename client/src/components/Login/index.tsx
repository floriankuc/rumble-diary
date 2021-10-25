import React, { ReactNode } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormControl-root': {
      marginBottom: 20,
    },
  },
  button: {
    alignSelf: 'end',
  },
  errorMsg: {
    color: '#DD0000',
    marginBottom: 14,
    fontSize: '.75rem',
  },
});

export interface LoginProps {
  handleSubmit: (values: any) => void;
  msg: ReactNode;
}

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const Login = (props: LoginProps) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
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
        />
        <Typography className={classes.errorMsg}>{props.msg}</Typography>
        <Button color="primary" variant="contained" type="submit" className={classes.button} disabled={!formik.isValid}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
