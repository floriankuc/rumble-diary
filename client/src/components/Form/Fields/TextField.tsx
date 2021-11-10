import { FormControlLabel, TextField as MuiTextField, BaseTextFieldProps } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import { useField, FieldHookConfig } from 'formik';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
});

export interface TextFieldProps extends BaseTextFieldProps {
  label?: ReactNode;
}

const CustomTextField = ({ disabled, type, id, multiline, label, ...restProps }: TextFieldProps & FieldHookConfig<string>): ReactElement => {
  const classes = useStyles();
  const [field, meta] = useField(restProps);

  return (
    <FormControlLabel
      control={
        <MuiTextField
          {...field}
          disabled={disabled}
          type={type}
          id={id}
          name={id}
          value={meta.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          variant="outlined"
          multiline={multiline}
          minRows={multiline ? 3 : 0}
          InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
          }}
          fullWidth
        />
      }
      label={label || <FormattedMessage id={`form.label.${id}`} />}
      labelPlacement="top"
      className={classes.formControlLabel}
    />
  );
};

export default CustomTextField;
