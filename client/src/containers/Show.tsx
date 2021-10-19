import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getItem, editItem } from '../actions/itemActions';
import { useHistory, useRouteMatch } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Night, NightOptional, NightAndFormProps, DefiniteNightAndFormProps } from './Form';
import { FormikProps } from 'formik';
import EditForm from '../components/EditForm';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { calculateDurationInMinutes } from '../helpers/date';
import { APP_ROUTES } from '../routes';

type PropsFromReduxEdit = ConnectedProps<typeof connector>;

export interface EditFormProps extends RouteComponentProps {
  sleepless: boolean;
}

interface MatchParams {
  id: string;
}

export interface AddNightReduxProps extends PropsFromReduxEdit {
  isAuthenticated: boolean;
  isLoading: boolean;
  itemLoading: boolean;
  itemSuccess: boolean;
}

const Show: React.FC<FormikProps<EditFormProps> & NightOptional & AddNightReduxProps> = (
  props: FormikProps<EditFormProps> & NightOptional & AddNightReduxProps
) => {
  const match = useRouteMatch<MatchParams>();
  const history = useHistory();

  const handleSubmit = (values: DefiniteNightAndFormProps) => {
    const duration = calculateDurationInMinutes(values.startTime, values.endTime, values.breaks);
    // const { sleepless, ...restValues } = values;
    props.editItem({ ...values, duration });
  };

  useEffect(() => {
    if (props.success) {
      history.push(APP_ROUTES.diary);
    }
  }, [props.success, history]);

  useEffect(() => {
    if (props.user && props.user.id) {
      console.log('get item fires');
      props.getItem(match.params.id);
    }
  }, [props.user, match.params.id]);

  console.log('this is item', props.item);

  console.log('props', props);

  if (props.item && props.item.items && props.item.items.length === 1 && props.item.items[0]) {
    return <EditForm item={props.item.items[0]} handleSubmit={handleSubmit} />;
  } else {
    return <></>;
  }
};

const mapStateToProps = (state: any) => ({
  itemLoading: state.item.loading,
  success: state.item.success,
  isAuthenticated: state.auth.isAuthenticated,
  item: state.item,
  user: state.auth.user,
});

const connector = connect(mapStateToProps, { getItem, editItem });

export default connector(Show);
