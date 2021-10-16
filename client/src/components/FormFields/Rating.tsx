import { FormControlLabel, TextField as MuiTextField, BaseTextFieldProps, Rating } from '@mui/material';
import React, { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';
import { useField, Form, FormikProps, Formik, FieldHookConfig } from 'formik';

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
    // <FormControlLabel
    //   control={
    //     <MuiTextField
    //       {...field}
    //       disabled={props.disabled}
    //       type={props.type}
    //       id={props.id}
    //       name={props.id}
    //       value={meta.value || props.value}

    //       error={meta.touched && Boolean(meta.error)}
    //       helperText={meta.touched && meta.error}
    //       variant="outlined"
    //     />
    //   }
    //   label={props.label}
    //   labelPlacement="top"
    //   className={classes.formControlLabel}
    // />
  );
};

export default CustomRatingField;

// <FormControlLabel
//   control={<Rating name="conditions.mentalStatus" id="mentalStatus" value={values.conditions.mentalStatus} onChange={handleChange} />}
//   label="How was your mental state?"
//   labelPlacement="top"
//   sx={{ my: 3 }}
//   className={classes.formControlLabel}
// />;