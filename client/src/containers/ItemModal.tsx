import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Checkbox, Divider, Rating, TextField, Typography } from '@mui/material';
// import custom react datepicker overrides
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { differenceInMinutes } from 'date-fns';
import { differenceInDays, differenceInHours } from 'date-fns/esm';
import { FieldArray, Form, Formik, FormikErrors, validateYupSchema, yupToFormErrors } from 'formik';
import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { addItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import NightAddForm from '../components/Form';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface IConditions {
  temperature?: number;
  freshAir: boolean;
  fed: boolean;
  mentalStatus: number;
  noDrinks1HourBefore: boolean;
  noCaffeine4HoursBefore: boolean;
  noElectronicDevices: boolean;
}

export interface IBreak {
  start: Date;
  end: Date;
}

export interface IOptionalBreak {
  start?: Date;
  end?: Date;
}
export interface INight {
  date?: Date | null;
  startTime?: Date;
  endTime?: Date;
  breaks?: IOptionalBreak[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes?: string;
  conditions: IConditions;
}

export interface IDefiniteNight {
  date: Date;
  startTime: Date;
  endTime: Date;
  breaks?: IBreak[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes?: string;
  conditions: IConditions;
}

export type AdditionalFormProps = {
  sleepless: boolean;
};

export interface IItemModal extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

export type DefiniteNightAndFormProps = IDefiniteNight & AdditionalFormProps;
export type NightAndFormProps = INight & AdditionalFormProps;

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

const validationSchema = yup.object({
  conditions: yup
    .object({
      temperature: yup.number().required('Enter a temperature'),
      freshAir: yup.bool().required(),
      fed: yup.bool().required(),
      mentalStatus: yup.number().required(),
      noDrinks1HourBefore: yup.bool().required(),
      noCaffeine4HoursBefore: yup.bool().required(),
      noElectronicDevices: yup.bool().required(),
    })
    .required(),
  date: yup.date().required('Enter a date'),
  sleepless: yup.bool(),
  startTime: yup
    .date()
    .test({
      test: (values, ctx) => {
        if (values) {
          return differenceInHours(values, ctx.parent.date) > 24 || differenceInHours(values, ctx.parent.date) < 0
            ? ctx.createError({ message: 'Start of sleep must be on same day or one day after', path: 'startTime' })
            : true;
        }
        return true;
      },
    })
    .nullable()
    .required('Enter a start time'),
  endTime: yup
    .date()
    .when('startTime', {
      is: (startTime: Date) => {
        return !!startTime ? true : false;
      },
      then: yup
        .date()
        .min(yup.ref('startTime'), "End date can't be before Start date")
        .test({
          test: function (endTime, ctx) {
            if (endTime) {
              return differenceInDays(endTime, ctx.parent.date) > 1 ? this.createError({ message: 'Too long', path: 'endTime' }) : true;
            }
            return true;
          },
        }),
    })
    .nullable()
    .required('Enter an end time'),
  breaks: yup.array(
    yup.object({
      start: yup
        .date()
        .test({
          test: function (breakStart, ctx) {
            if (ctx.options.context!.startTime && breakStart) {
              return differenceInHours(breakStart, ctx.options.context!.date) > 24 || differenceInHours(breakStart, ctx.options.context!.date) < 0
                ? ctx.createError({ message: 'Break Start of sleep must be on same day or one day after', path: this.path })
                : true;
            }
            return true;
          },
        })
        .nullable()
        .required('enter a break start time'),
      end: yup
        .date()
        .test({
          test: function (breakEnd, ctx) {
            if (ctx.options.context!.startTime && breakEnd) {
              if (differenceInHours(breakEnd, ctx.options.context!.date) > 24 || differenceInHours(breakEnd, ctx.options.context!.date) < 0) {
                return ctx.createError({ message: 'Break end of sleep must be on same day or one day after', path: this.path });
              } else if (breakEnd < ctx.parent.start) {
                return ctx.createError({ message: 'break end before breaks start', path: this.path });
              } else {
                return true;
              }
            }
            return true;
          },
        })
        .nullable()
        .required('enter a break end time'),
    })
  ),
  nightmares: yup.bool().required(),
  noise: yup.bool().required(),
  quality: yup.number().required(),
});

const ItemModal = (props: IItemModal) => {
  const classes = useStyles();
  const history = useHistory();

  console.log('props.addmodal', props);
  console.log('success', props.itemSuccess);

  const outputMinutes = (mins: number): string => {
    const phours = `${Math.floor(mins / 60)}`.padStart(2, '0');
    const pmins = `${mins % 60}`.padStart(2, '0');
    return mins < 60 ? `${mins} mins` : `${phours}:${pmins} h`;
  };

  const sumUpBreaksInMinutes = (breaks: (IOptionalBreak | IBreak)[] = []): number => {
    return breaks.reduce((a: number, b: IBreak | IOptionalBreak): number => {
      if (b.end && b.start) {
        return a + differenceInMinutes(b.end, b.start);
      } else {
        return 0;
      }
    }, 0);
  };

  const calculateDifferenceInMinutes = (endTime: Date, startTime: Date): number => differenceInMinutes(endTime, startTime);

  const calculateDurationInMinutes = (startTime: Date, endTime: Date, breaks: (IOptionalBreak | IBreak)[] = []): number => {
    if (!breaks) {
      return startTime && endTime && calculateDifferenceInMinutes(endTime, startTime);
    }
    return startTime && endTime && calculateDifferenceInMinutes(endTime, startTime) - sumUpBreaksInMinutes(breaks);
  };

  const handleSubmit = (values: DefiniteNightAndFormProps) => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    const { sleepless, ...restValues } = values;
    props.addItem({ ...restValues, duration });
  };

  if (props.itemLoading) {
    console.log('ITEM LOADED');
  }

  useEffect(() => {
    if (props.itemSuccess) {
      history.push(APP_ROUTES.diary);
    }
  }, [props.itemSuccess, history]);

  return <NightAddForm handleSubmit={handleSubmit} />;
};

const mapStateToProps = (state: any) => ({
  itemLoading: state.item.loading,
  itemSuccess: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(ItemModal);
