import { BaseTextFieldProps, Checkbox, FormControlLabel } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement, ReactNode } from 'react';

export interface CheckboxProps {
  id: BaseTextFieldProps['id'];
  label: ReactNode;
  value?: string | number;
}

const CustomCheckbox = ({ id, label, value, disabled, ...restProps }: CheckboxProps & FieldHookConfig<boolean>): ReactElement => {
  const [field, , helpers] = useField(restProps);

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          value={field.value}
          disabled={disabled}
          checked={field.value}
          id={id}
          name={id}
          onChange={(): void => helpers.setValue(!field.value)}
        />
      }
      label={label}
      aria-label={label?.toString()}
    />
  );
};

export default CustomCheckbox;
