import { FormikProps } from 'formik';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { addItem } from '../actions/item/itemActions';
import { APP_ROUTES } from '../routes';
import { calculateDurationInMinutes } from '../helpers/date';
import Form from '../components/Form';
import history from '../routes/history';
import { FormNight, Night } from '../entities/Night';
import { AppState } from '../reducers';
import CircularProgress from '@mui/material/CircularProgress';
import { FormattedMessage } from 'react-intl';

type PropsFromRedux = ConnectedProps<typeof connector>;

type AddFormContainerState = {
  isSubmitting: boolean;
};
class AddFormContainer extends React.Component<FormikProps<FormNight> & PropsFromRedux & AddFormContainerState> {
  state = { isSubmitting: false };

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
    this.setState({ isSubmitting: true });
    this.props.addItem({ ...values, duration });
  };

  componentDidUpdate(_: FormikProps<FormNight> & PropsFromRedux, prevState: AddFormContainerState): void {
    if (!this.props.itemState.loading && this.props.itemState.success && this.state.isSubmitting) {
      this.setState({ isSubmitting: false });
    }
    if (prevState.isSubmitting !== this.state.isSubmitting) {
      history.push(APP_ROUTES.diary);
    }
  }

  render() {
    return this.props.itemState.loading ? (
      <CircularProgress />
    ) : (
      <>
        <Form
          handleSubmit={this.handleSubmit}
          initialValues={this.initialValues}
          headline={<FormattedMessage id="form.add.headline" />}
          submitText={<FormattedMessage id="form.add.submitText" />}
          subTitles={{ subtitle1: <FormattedMessage id="form.subtitle1" />, subTitle2: <FormattedMessage id="form.subtitle2" /> }}
          summary={<FormattedMessage id="form.summary" />}
          isSubmitting={this.state.isSubmitting}
        />
      </>
    );
  }
}

const mapStateToProps = ({ itemState, authState }: AppState) => ({
  itemState,
  authState,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(AddFormContainer);
