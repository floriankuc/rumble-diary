// import custom react datepicker overrides
import { FormikProps } from 'formik';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { addItem } from '../actions/item/itemActions';
import { APP_ROUTES } from '../routes';
import { calculateDurationInMinutes } from '../helpers/date';
import FormComponents from '../components/Form';
import history from '../routes/history';
import { FormNight, Night } from '../entities/Night';
import { AppState } from '../reducers';

type PropsFromRedux = ConnectedProps<typeof connector>;

class AddFormContainer extends React.Component<FormikProps<FormNight> & PropsFromRedux> {
  initialValues: FormNight = {
    date: undefined,
    sleepless: false,
    startTime: undefined,
    endTime: undefined,
    breaks: undefined,
    nightmares: false,
    noise: false,
    quality: 0,
    notes: '',
    conditions: {
      temperature: 0,
      freshAir: false,
      fed: false,
      mentalStatus: 0,
      noDrinks1HourBefore: false,
      noCaffeine4HoursBefore: false,
      noElectronicDevices: false,
    },
  };

  handleSubmit = (values: Night): void => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    this.props.addItem({ ...values, duration });
  };

  componentDidUpdate(): void {
    if (this.props.itemState.success) {
      history.push(APP_ROUTES.diary);
    }
  }

  render() {
    return <FormComponents handleSubmit={this.handleSubmit} initialValues={this.initialValues} headline={'Add night'} submitText={'Add'} />;
  }
}

const mapStateToProps = ({ itemState, authState }: AppState) => ({
  itemState,
  authState,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(AddFormContainer);
