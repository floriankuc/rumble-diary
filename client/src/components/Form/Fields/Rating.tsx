import { BaseTextFieldProps, FormControlLabel, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
});

export interface RatingFieldProps {
  id: BaseTextFieldProps['id'];
  value?: string | number;
}

const CustomRatingField = ({ id, disabled, ...restProps }: RatingFieldProps & FieldHookConfig<string>): ReactElement => {
  const classes = useStyles();
  const [field, meta] = useField(restProps);

  return (
    <FormControlLabel
      control={<Rating name={id} id={id} value={+meta.value} onChange={field.onChange} onBlur={field.onBlur} disabled={disabled} />}
      label={<FormattedMessage id={`form.label.${id}`} />}
      labelPlacement="top"
      sx={{ my: 3 }}
      className={classes.formControlLabel}
    />
  );
};

export default CustomRatingField;
