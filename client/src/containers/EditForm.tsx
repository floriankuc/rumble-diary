import { FormikProps } from 'formik';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { editItem, getItem } from '../actions/item/itemActions';
import FormComponents from '../components/Form';
import { FormNight, Night } from '../entities/Night';
import { calculateDurationInMinutes } from '../helpers/date';
import { AppState } from '../reducers';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface RouteParams {
  id: string;
}
class EditFormContainer extends React.Component<FormikProps<FormNight> & PropsFromRedux & RouteComponentProps<RouteParams>> {
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
  componentDidUpdate(): void {
    if (this.props.itemState.success) {
      history.push(APP_ROUTES.diary);
    }
  }

  handleSubmit = (values: Night): void => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    this.props.editItem({ ...values, duration });
  };

  render() {
    const { items } = this.props.itemState;

    if (items && items.length === 1 && items[0]) {
      return <FormComponents handleSubmit={this.handleSubmit} initialValues={this.getInitialValues(items[0])} headline={'Edit night'} submitText={'Save'} />;
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = ({ itemState, authState }: AppState) => ({
  itemState,
  authState,
});

const connector = connect(mapStateToProps, { getItem, editItem });

export default connector(EditFormContainer);
