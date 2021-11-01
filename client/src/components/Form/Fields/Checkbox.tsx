import { BaseTextFieldProps, Checkbox, FormControlLabel } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export interface CheckboxProps {
  id: BaseTextFieldProps['id'];
  value?: string | number;
}

const CustomCheckbox = ({ id, value, disabled, ...restProps }: CheckboxProps & FieldHookConfig<boolean>): ReactElement => {
  const intl = useIntl();
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
      label={<FormattedMessage id={`form.label.${id}`} />}
      aria-label={intl.formatMessage({ id: `form.label.${id}` })}
    />
  );
};

export default CustomCheckbox;
