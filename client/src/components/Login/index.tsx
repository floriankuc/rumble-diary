import React, { ReactElement, ReactNode } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { LoginCredentials } from '../../actions/types';

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
  handleSubmit: (values: LoginCredentials) => void;
  msg: ReactNode;
}

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const Login = ({ handleSubmit, msg }: LoginProps): ReactElement => {
  const classes = useStyles();

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { handleSubmit: formikSubmit, errors, touched, values, handleChange, isValid } = formik;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={formikSubmit} className={classes.formContainer}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          variant="outlined"
        />
        <Typography className={classes.errorMsg}>{msg}</Typography>
        <Button color="primary" variant="contained" type="submit" className={classes.button} disabled={!isValid}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
