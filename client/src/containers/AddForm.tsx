// import custom react datepicker overrides
import { FormikProps } from 'formik';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';
import { calculateDurationInMinutes } from '../helpers/date';
import FormComponents from '../components/Form';
import history from '../routes/history';

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
  sleepless: boolean;
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
  sleepless: boolean;
}

export type FormProps = {
  // sleepless: boolean;
};

export interface AddNightReduxProps extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

export type DefiniteNightAndFormProps = Night & FormProps;
export type NightAndFormProps = NightOptional & FormProps;

class FormContainer extends React.Component<FormikProps<FormProps> & NightOptional & AddNightReduxProps> {
  initialValues: NightAndFormProps = {
    date: undefined,
    sleepless: false,
    startTime: undefined,
    endTime: undefined,
    breaks: undefined,
    nightmares: false,
    noise: false,
    quality: 0,
    notes: undefined,
    conditions: {
      temperature: undefined,
      freshAir: false,
      fed: false,
      mentalStatus: 0,
      noDrinks1HourBefore: false,
      noCaffeine4HoursBefore: false,
      noElectronicDevices: false,
    },
  };

  handleSubmit = (values: DefiniteNightAndFormProps) => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    this.props.addItem({ ...values, duration });
  };

  componentDidUpdate() {
    if (this.props.itemSuccess) {
      history.push(APP_ROUTES.diary);
    }
  }

  render() {
    return <FormComponents handleSubmit={this.handleSubmit} initialValues={this.initialValues} headline={'Add night'} submitText={'Add night'} />;
  }
}

const mapStateToProps = (state: any) => ({
  itemLoading: state.item.loading,
  itemSuccess: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(FormContainer);
