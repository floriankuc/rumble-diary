// import custom react datepicker overrides
import { FormikProps } from 'formik';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

export interface BreakOptional {
  start?: Date;
  end?: Date;
}

export interface NightOptional {
  _id?: string;
  date?: Date | null;
  startTime?: Date;
  endTime?: Date;
  breaks?: BreakOptional[];
  nightmares: boolean;
  noise: boolean;
  quality: number;
  notes?: string;
  conditions: Conditions;
}

export interface Night {
  _id?: string;
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

export type FormProps = {
  sleepless: boolean;
};

export interface AddNightReduxProps extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

export type DefiniteNightAndFormProps = Night & FormProps;
export type NightAndFormProps = NightOptional & FormProps;

const ItemModal: React.FC<FormikProps<FormProps> & NightOptional & AddNightReduxProps> = (
  props: FormikProps<FormProps> & NightOptional & AddNightReduxProps
) => {
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
