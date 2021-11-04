import { TextField, Theme, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import React, { ReactElement, ReactNode } from 'react';
import * as yup from 'yup';
import { RegisterCredentials } from '../../actions/types';
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

export interface RegisterProps extends WrappedComponentProps {
  handleSubmit: (values: RegisterCredentials) => void;
  msg: ReactNode;
}

const validationSchema = (intl: IntlShape): MixedSchema =>
  yup.object({
    name: yup.string().required(intl.formatMessage({ id: 'form.login.validation.name.required' })),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'form.login.validation.email.help' }))
      .required(intl.formatMessage({ id: 'form.login.validation.email.required' })),
    password: yup
      .string()
      .min(3, intl.formatMessage({ id: 'form.login.validation.password.help' }))
      .required(intl.formatMessage({ id: 'form.login.validation.password.required' })),
  });

const Register = ({ handleSubmit, msg, intl }: RegisterProps): ReactElement => {
  const classes = useStyles();

  const formik = useFormik<RegisterCredentials>({
    initialValues: {
      name: '',
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
