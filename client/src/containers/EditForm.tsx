import { FormikProps } from 'formik';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { match, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { editItem, getItem } from '../actions/itemActions';
import FormComponents from '../components/Form';
import { FormNight, Night } from '../entities/Night';
import { calculateDurationInMinutes } from '../helpers/date';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';
import { NightAndFormProps } from './AddForm';

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface EditNightReduxProps extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  success: boolean;
  item: any;
}
export interface EditFormProps extends RouteComponentProps<RouteParams> {
  sleepless: boolean;
}

interface MatchParams {
  id: string;
  match: match;
}

interface RouteParams {
  id: string;
}
class EditFormContainer extends React.Component<EditFormProps & FormNight & EditNightReduxProps & MatchParams> {
  getInitialValues = (item: Night): NightAndFormProps => ({
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

  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      this.props.getItem(this.props.match.params.id);
    }
  }
  componentDidUpdate() {
    if (this.props.success) {
      history.push(APP_ROUTES.diary);
    }
  }

  handleSubmit = (values: Night) => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    this.props.editItem({ ...values, duration });
  };

  render() {
    if (this.props.item && this.props.item.items && this.props.item.items.length === 1 && this.props.item.items[0]) {
      return (
        <FormComponents
          handleSubmit={this.handleSubmit}
          initialValues={this.getInitialValues(this.props.item.items[0])}
          headline={'Edit night'}
          submitText={'Save'}
        />
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state: any) => ({
  itemLoading: state.item.loading,
  success: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
  item: state.item,
  user: state.auth.user,
});

const connector = connect(mapStateToProps, { getItem, editItem });

export default connector(EditFormContainer);
