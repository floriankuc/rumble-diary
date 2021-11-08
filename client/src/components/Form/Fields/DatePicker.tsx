import { BaseTextFieldProps, FormControlLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FieldHookConfig, useField } from 'formik';
import React, { ReactElement, ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles((theme: Theme) => ({
  calendarWrapper: {
    marginTop: 20,
  },
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  calendarErrorMessage: {
    color: theme.colors.error,
    fontWeight: 400,
    fontSize: '.75rem',
    marginLeft: 14,
  },
  calendar: {
    transitionDuration: '0s',
    border: `1px solid ${theme.colors.default}`,
    borderRadius: 5,
    height: 40,
    padding: 14,
    width: 260,
    fontSize: 16,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    '&:hover:enabled': {
      border: '1px solid #000000',
    },
    '&:focus:enabled': {
      outline: 'none',
      padding: 13,
      boxShadow: 'none',
      border: `2px solid ${theme.colors.primary}`,
    },
  },
}));

export interface DatePickerProps {
  id: BaseTextFieldProps['id'];
  label?: ReactNode;
  error?: ReactNode;
  value?: string | number;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
}

const CustomDatePicker = ({
  id,
  disabled,
  showTimeSelect,
  placeholder,
  showTimeSelectOnly,
  label,
  ...restProps
}: DatePickerProps & FieldHookConfig<Date | null>): ReactElement => {
  const classes = useStyles();
  const intl = useIntl();
  const [field, meta, helpers] = useField(restProps);

  return (
    <div className={classes.calendarWrapper}>
      <FormControlLabel
        control={
          <DatePicker
            id={id}
            disabled={disabled}
            onBlur={field.onBlur}
            selected={meta.value ? new Date(meta.value) : null}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            placeholderText={placeholder}
            timeFormat={showTimeSelect ? 'kk:mm' : ''}
            dateFormat={`d MMMM yyyy${showTimeSelect ? ', kk:mm' : ''}`}
            name={id}
            className={`form-control ${classes.calendar}`}
            onChange={(time: Date | null): void => {
              helpers.setValue(time);
              helpers.setTouched(true);
            }}
          />
        }
        label={label || <FormattedMessage id={`form.label.${id}`} />}
        aria-label={label?.toString() || intl.formatMessage({ id: `form.label.${id}` })}
        labelPlacement="top"
        className={classes.formControlLabel}
      />
      {meta.error && meta.touched && <Typography className={classes.calendarErrorMessage}>{meta.error}</Typography>}
    </div>
  );
};

export default CustomDatePicker;
