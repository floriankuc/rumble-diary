import { CircularProgress } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { editItem, getItem } from '../actions/item/itemActions';
import FormComponents from '../components/Form';
import { FormNight, Night } from '../entities/Night';
import { calculateDurationInMinutes } from '../helpers/date';
import { AppState } from '../reducers';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';
import { NotFound404 } from '../components/404';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface RouteParams {
  id: string;
}

type EditFormContainerState = {
  isSubmitting: boolean;
};

class EditFormContainer extends React.Component<FormikProps<FormNight> & PropsFromRedux & RouteComponentProps<RouteParams>, EditFormContainerState> {
  state = { isSubmitting: false };

  getInitialValues = (item: Night): FormNight => ({
    _id: item._id,
    date: item.date ? new Date(item.date) : new Date(),
    sleepless: item.sleepless,
    startTime: item.startTime ? new Date(item.startTime) : undefined,
    endTime: item.endTime ? new Date(item.endTime) : undefined,
    breaks: item.breaks,
    nightmares: item.nightmares,
    noise: item.noise,
    quality: item.quality,
    notes: item.notes,
    conditions: {
      temperature: item.conditions.temperature,
      freshAir: item.conditions.freshAir,
      fed: item.conditions.fed,
      mentalStatus: item.conditions.mentalStatus,
      noDrinks1HourBefore: item.conditions.noDrinks1HourBefore,
      noCaffeine4HoursBefore: item.conditions.noCaffeine4HoursBefore,
      noElectronicDevices: item.conditions.noElectronicDevices,
    },
  });

  componentDidMount(): void {
    if (this.props.authState.user && this.props.authState.user.id) {
      this.props.getItem(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps: PropsFromRedux, prevState: EditFormContainerState): void {
    if (!this.props.itemState.loading && this.props.itemState.success && this.state.isSubmitting) {
      this.setState({ isSubmitting: false });
    }
    if (prevState.isSubmitting !== this.state.isSubmitting) {
      history.push(APP_ROUTES.diary);
    }
    if (!prevProps.authState.user && this.props.authState.user) {
      this.props.getItem(this.props.match.params.id);
    }
  }

  handleSubmit = (values: Night): void => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    this.setState({ isSubmitting: true });
    this.props.editItem({ ...values, duration });
  };

  render() {
    const { items } = this.props.itemState;
    if (this.props.itemState.loading) {
      return <CircularProgress />;
    } else if (items && items.length === 1 && items[0] && !this.props.itemState.loading) {
      return (
        <FormComponents
          isSubmitting={this.state.isSubmitting}
          handleSubmit={this.handleSubmit}
          initialValues={this.getInitialValues(items[0])}
          headline={<FormattedMessage id="form.edit.headline" />}
          subTitles={{ subtitle1: <FormattedMessage id="form.subtitle1" />, subTitle2: <FormattedMessage id="form.subtitle2" /> }}
          submitText={<FormattedMessage id="form.edit.submitText" />}
          summary={<FormattedMessage id="form.summary" />}
        />
      );
    } else if (this.props.errorState.status) {
      return <NotFound404 />;
    } else {
      return <p>ok</p>; //todo
    }
  }
}

const mapStateToProps = ({ itemState, authState, errorState }: AppState) => ({
  itemState,
  authState,
  errorState,
});

const connector = connect(mapStateToProps, { getItem, editItem });

export default connector(EditFormContainer);
