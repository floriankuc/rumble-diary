import { BaseTextFieldProps, FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactNode } from 'react';
import DatePicker from 'react-datepicker';

const useStyles = makeStyles({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  calendarErrorMessage: {
    color: '#D32F2F',
    fontWeight: 400,
    fontSize: '.75rem',
    marginLeft: 14,
  },
  calendar: {
    transitionDuration: '0s',
    border: '1px solid #C4C4C4',
    borderRadius: 5,
    height: 40,
    padding: 14,
    width: 260,
    fontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    '&:hover:enabled': {
      border: '1px solid black',
    },
    '&:focus:enabled': {
      outline: 'none',
      padding: 13,
      boxShadow: 'none',
      border: '2px solid #1976D2',
    },
  },
});

export interface DatePickerProps {
  id: BaseTextFieldProps['id'];
  label: ReactNode;
  error?: ReactNode;
  value?: string | number;
  showTimeSelect?: boolean;
}

const CustomDatePicker = (props: DatePickerProps & FieldHookConfig<Date | null>) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);

  return (
    <div style={{ marginTop: 20 }}>
      <FormControlLabel
        control={
          <DatePicker
            id={props.id}
            disabled={props.disabled}
            onBlur={field.onBlur}
            selected={meta.value ? new Date(meta.value) : null}
            showTimeSelect={props.showTimeSelect}
            placeholderText={props.placeholder}
            timeFormat={props.showTimeSelect ? 'kk:mm' : ''}
            dateFormat={`d MMMM yyyy${props.showTimeSelect ? ', kk:mm' : ''}`}
            name={props.id}
            className={`form-control ${classes.calendar}`}
            onChange={(time: Date | null) => {
              helpers.setValue(time);
              helpers.setTouched(true);
            }}
          />
        }
        label={props.label}
        labelPlacement="top"
        className={classes.formControlLabel}
      />
      {meta.error && meta.touched && <Typography className={classes.calendarErrorMessage}>{meta.error}</Typography>}
    </div>
  );
};

export default CustomDatePicker;
