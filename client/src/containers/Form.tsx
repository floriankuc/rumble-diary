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
import { calculateDurationInMinutes } from '../helpers/date';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface Conditions {
  temperature?: number;
  freshAir: boolean;
  fed: boolean;
  mentalStatus: number;
  noDrinks1HourBefore: boolean;
  noCaffeine4HoursBefore: boolean;
  noElectronicDevices: boolean;
}

export interface Break {
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
  conditions: Conditions;
}

export interface IDefiniteNight {
  date: Date;
  startTime: Date;
  endTime: Date;
  breaks?: Break[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes?: string;
  conditions: Conditions;
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

const ItemModal = (props: IItemModal) => {
  const history = useHistory();

  console.log('props.addmodal', props);
  console.log('success', props.itemSuccess);

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
