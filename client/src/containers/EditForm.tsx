import { CircularProgress } from '@mui/material';
import { FormikProps } from 'formik';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { editItem, getItem } from '../actions/item/itemActions';
import Form from '../components/Form';
import { FormEntry, Entry } from '../entities/Entry';
// import { calculateDurationInMinutes } from '../helpers/date';
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

class EditFormContainer extends React.Component<FormikProps<FormEntry> & PropsFromRedux & RouteComponentProps<RouteParams>, EditFormContainerState> {
  state = { isSubmitting: false };

  getInitialValues = (item: Entry): FormEntry => ({
    _id: item._id,
    date: item.date ? new Date(item.date) : new Date(),
    conditions: {
      fluidIntake: item.conditions.fluidIntake,
      medication: item.conditions.medication,
      meals: item.conditions.meals,
      activities: item.conditions.activities,
      stressLevel: item.conditions.stressLevel,
      stoolPerDay: item.conditions.stoolPerDay,
      wellbeing: item.conditions.wellbeing,
    },
    observations: {
      bloating: item.observations.bloating,
      nausea: item.observations.nausea,
      cramps: item.observations.cramps,
      diarrhoea: item.observations.diarrhoea,
      flatulence: item.observations.flatulence,
      diffusePain: item.observations.diffusePain,
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

  handleSubmit = (values: Entry): void => {
    this.setState({ isSubmitting: true });
    this.props.editItem({ ...values });
  };

  render(): ReactElement {
    const { items } = this.props.itemState;
    if (this.props.itemState.loading) {
      return <CircularProgress />;
    } else if (items && items.length === 1 && items[0] && !this.props.itemState.loading) {
      return (
        <Form
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
      return <></>;
    }
  }
}

const mapStateToProps = ({ itemState, authState, errorState }: AppState): AppState => ({
  itemState,
  authState,
  errorState,
});

const connector = connect(mapStateToProps, { getItem, editItem });

export default connector(EditFormContainer);
