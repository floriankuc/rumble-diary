import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { match, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { editItem, getItem } from '../actions/itemActions';
import EditForm from '../components/EditForm';
import { FormNight, Night } from '../entities/Night';
import { calculateDurationInMinutes } from '../helpers/date';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromReduxEdit = ConnectedProps<typeof connector>;

export interface EditFormProps extends RouteComponentProps<RouteParams> {
  sleepless: boolean;
}

interface MatchParams {
  id: string;
  match: match;
}

export interface AddNightReduxProps extends PropsFromReduxEdit {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

interface RouteParams {
  id: string;
}

class ShowContainer extends React.Component<EditFormProps & FormNight & AddNightReduxProps & MatchParams> {
  componentDidMount() {
    if (this.props.user && this.props.user.id) {
      console.log('get item fires');
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
      return <EditForm item={this.props.item.items[0]} handleSubmit={this.handleSubmit} />;
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

export default connector(withRouter(ShowContainer));
