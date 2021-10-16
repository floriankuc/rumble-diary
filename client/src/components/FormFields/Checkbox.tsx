import { FormControlLabel, TextField as MuiTextField, BaseTextFieldProps, Checkbox } from '@mui/material';
import React, { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import { useField, Form, FormikProps, Formik, FieldHookConfig } from 'formik';

export interface CheckboxProps {
  id: BaseTextFieldProps['id'];
  label: ReactNode;
  value?: string | number;
}

const CustomCheckbox = (props: CheckboxProps & FieldHookConfig<boolean>) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          value={field.value}
          disabled={props.disabled}
          id={props.id}
          name={props.id}
          onChange={(): void => helpers.setValue(!field.value)}
        />
      }
      label={props.label}
    />
  );
};

export default CustomCheckbox;
