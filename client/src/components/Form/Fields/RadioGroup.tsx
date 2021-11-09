import { BaseTextFieldProps, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement } from 'react';
import { MealTypeOptions } from '../../../entities/Night';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
});

export interface CustomRadioGroupProps {
  id: BaseTextFieldProps['id'];
  options: MealTypeOptions;
}

const CustomRadioGroup = ({ disabled, type, id, options, ...restProps }: CustomRadioGroupProps & FieldHookConfig<string>): ReactElement => {
  const classes = useStyles();
  const [field, , helpers] = useField(restProps);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name={id}
        id={id}
        value={field.value}
        onChange={(e): void => {
          helpers.setValue(e.currentTarget.value);
        }}
      >
        {Object.entries(options).map(([option, label]) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
