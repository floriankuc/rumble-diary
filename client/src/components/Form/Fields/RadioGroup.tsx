import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement, ReactNode } from 'react';
import { MealTypeOptions } from '../../../entities/Entry';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  radioGroupLabel: {
    color: '#000000DE',
  },
});

export interface CustomRadioGroupProps extends RadioGroupProps {
  options: MealTypeOptions;
  label: ReactNode;
}

const CustomRadioGroup = ({ label, id, options, ...restProps }: CustomRadioGroupProps & FieldHookConfig<string>): ReactElement => {
  const classes = useStyles();
  const [field, , helpers] = useField(restProps);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className={classes.radioGroupLabel}>
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-label={label?.toString()}
        name={id}
        id={id}
        value={field.value}
        onChange={(e): void => {
          helpers.setValue(e.currentTarget.value);
        }}
      >
        {Object.entries(options).map(([option, optionLabel]) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={optionLabel} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
