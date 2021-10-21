import { BaseTextFieldProps, FormControlLabel, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactNode } from 'react';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
});

export interface RatingFieldProps {
  // type: BaseTextFieldProps['type'];
  id: BaseTextFieldProps['id'];
  label: ReactNode;
  value?: string | number;
}

const CustomRatingField = (props: RatingFieldProps & FieldHookConfig<string>) => {
  const classes = useStyles();
  const [field, meta] = useField(props);

  return (
    <FormControlLabel
      control={<Rating name={props.id} id={props.id} value={+meta.value} onChange={field.onChange} onBlur={field.onBlur} disabled={props.disabled} />}
      label={props.label}
      labelPlacement="top"
      sx={{ my: 3 }}
      className={classes.formControlLabel}
    />
  );
};

export default CustomRatingField;
