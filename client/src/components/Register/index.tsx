import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import React, { ReactNode } from 'react';
import * as yup from 'yup';
import { RegisterCredentials } from '../../actions/types';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';

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

export interface RegisterProps extends WrappedComponentProps {
  handleSubmit: (values: RegisterCredentials) => void;
  msg: ReactNode;
}

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
});

const Register = ({ handleSubmit, msg, intl }: RegisterProps) => {
  const classes = useStyles();

  const formik = useFormik<RegisterCredentials>({
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

  const { handleSubmit: formikSubmit, errors, touched, values, handleChange, isValid } = formik;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        <FormattedMessage id="form.register.headline" />
      </Typography>
      <form onSubmit={formikSubmit} className={classes.formContainer}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={<FormattedMessage id="form.register.label.name" />}
          InputLabelProps={{ 'aria-label': intl.formatMessage({ id: 'form.register.label.name' }) }}
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label={<FormattedMessage id="form.register.label.email" />}
          InputLabelProps={{ 'aria-label': intl.formatMessage({ id: 'form.register.label.email' }) }}
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
          label={<FormattedMessage id="form.register.label.password" />}
          InputLabelProps={{ 'aria-label': intl.formatMessage({ id: 'form.register.label.password' }) }}
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          variant="outlined"
        />
        <Typography className={classes.errorMsg}>{msg}</Typography>
        <Button color="primary" variant="contained" type="submit" className={classes.button} disabled={!isValid}>
          <FormattedMessage id="form.register.btn.submit" />
        </Button>
      </form>
    </div>
  );
};

export default injectIntl(Register);
