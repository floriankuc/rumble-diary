import { FormControlLabel, TextField as MuiTextField, BaseTextFieldProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import { useField, FieldHookConfig } from 'formik';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
});

export interface TextFieldProps {
  type: BaseTextFieldProps['type'];
  id: BaseTextFieldProps['id'];
  label: ReactNode;
  value?: string | number;
  multiline?: boolean;
}

const CustomTextField = (props: TextFieldProps & FieldHookConfig<string>) => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <FormControlLabel
      control={
        <MuiTextField
          {...field}
          disabled={props.disabled}
          type={props.type}
          id={props.id}
          name={props.id}
          value={meta.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          variant="outlined"
          multiline={props.multiline}
          minRows={props.multiline ? 3 : 0}
          fullWidth
        />
      }
      label={props.label}
      labelPlacement="top"
      className={classes.formControlLabel}
    />
  );
};

export default CustomTextField;
