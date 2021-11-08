import { FormikProps } from 'formik';
import React, { ReactElement } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { connect, ConnectedProps } from 'react-redux';
import { addItem } from '../actions/item/itemActions';
import { APP_ROUTES } from '../routes';
import Form from '../components/Form';
import history from '../routes/history';
import { FormEntry, Entry } from '../entities/Night';
import { AppState } from '../reducers';
import CircularProgress from '@mui/material/CircularProgress';
import { FormattedMessage } from 'react-intl';

type PropsFromRedux = ConnectedProps<typeof connector>;

type AddFormContainerState = {
  isSubmitting: boolean;
};
class AddFormContainer extends React.Component<FormikProps<FormEntry> & PropsFromRedux & AddFormContainerState> {
  state = { isSubmitting: false };

  initialValues: FormEntry = {
    date: undefined,
    conditions: {
      fluidIntake: undefined,
      medication: undefined,
      meals: undefined,
      activities: undefined,
      stressLevel: undefined,
      stoolPerDay: undefined,
      wellbeing: undefined,
    },
    observations: {
      bloating: false,
      nausea: false,
      cramps: false,
      diarrhoea: false,
      flatulence: false,
      diffusePain: false,
    },
  };

  handleSubmit = (values: Entry): void => {
    this.setState({ isSubmitting: true });
    console.log('submitting this: ', values);
    this.props.addItem({ ...values });
  };

  componentDidUpdate(_: FormikProps<FormEntry> & PropsFromRedux, prevState: AddFormContainerState): void {
    if (!this.props.itemState.loading && this.props.itemState.success && this.state.isSubmitting) {
      this.setState({ isSubmitting: false });
    }
    if (prevState.isSubmitting !== this.state.isSubmitting) {
      history.push(APP_ROUTES.diary);
    }
  }

  render(): ReactElement {
    return this.props.itemState.loading ? (
      <CircularProgress />
    ) : (
      <Form
        handleSubmit={this.handleSubmit}
        initialValues={this.initialValues}
        headline={<FormattedMessage id="form.add.headline" />}
        submitText={<FormattedMessage id="form.add.submitText" />}
        subTitles={{ subtitle1: <FormattedMessage id="form.subtitle1" />, subTitle2: <FormattedMessage id="form.subtitle2" /> }}
        summary={<FormattedMessage id="form.summary" />}
        isSubmitting={this.state.isSubmitting}
      />
    );
  }
}

const mapStateToProps = ({ itemState, authState }: AppState): Omit<AppState, 'errorState'> => ({
  itemState,
  authState,
});

const connector = connect(mapStateToProps, { addItem });

export default connector(AddFormContainer);
