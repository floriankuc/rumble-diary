import React, { ReactElement, ReactNode } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Theme, Typography } from '@mui/material';
import { LoginCredentials } from '../../actions/types';
import { FormattedMessage, injectIntl, IntlShape, WrappedComponentProps } from 'react-intl';
import { MixedSchema } from 'yup/lib/mixed';

const useStyles = makeStyles((theme: Theme) => ({
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
    color: theme.colors.error,
    marginBottom: 14,
    fontSize: '.75rem',
  },
}));

export interface LoginProps extends WrappedComponentProps {
  handleSubmit: (values: LoginCredentials) => void;
  msg: ReactNode;
}

const validationSchema = (intl: IntlShape) =>
  yup.object({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'form.login.validation.email.help' }))
      .required(intl.formatMessage({ id: 'form.login.validation.email.required' })),
    password: yup
      .string()
      .min(3, intl.formatMessage({ id: 'form.login.validation.password.help' }))
      .required(intl.formatMessage({ id: 'form.login.validation.password.required' })),
  });

const Login = ({ handleSubmit, msg, intl }: LoginProps): ReactElement => {
  const classes = useStyles();

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: (): MixedSchema => validationSchema(intl),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { handleSubmit: formikSubmit, errors, touched, values, handleChange, isValid } = formik;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        <FormattedMessage id="form.login.headline" />
      </Typography>
      <form onSubmit={formikSubmit} className={classes.formContainer}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label={<FormattedMessage id="form.login.label.email" />}
          InputLabelProps={{ 'aria-label': intl.formatMessage({ id: 'form.login.label.email' }) }}
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
          label={<FormattedMessage id="form.login.label.password" />}
          InputLabelProps={{ 'aria-label': intl.formatMessage({ id: 'form.login.label.password' }) }}
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          variant="outlined"
        />
        <Typography className={classes.errorMsg}>{msg}</Typography>
        <Button color="primary" variant="contained" type="submit" className={classes.button} disabled={!isValid}>
          <FormattedMessage id="form.login.btn.submit" />
        </Button>
      </form>
    </div>
  );
};

export default injectIntl(Login);
