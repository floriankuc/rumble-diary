import { createLogoutAction } from '../../actions/auth/authActionCreators';
import { APP_ROUTES } from '../../routes';
import history from '../../routes/history';
import store from '../../store';
import { ActionItemType } from '../ActionItem';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';

const handleLogout = (): void => {
  store.dispatch(createLogoutAction());
};

export const navbarItemsAuthenticated: ActionItemType[] = [
  {
    id: 'add',
    icon: <AddIcon />,
    text: <FormattedMessage id="action.add" />,
    action: (): void => history.push(APP_ROUTES.add),
  },
  {
    id: 'diary',
    icon: <MenuBookIcon />,
    text: <FormattedMessage id="action.diary" />,
    action: (): void => history.push(APP_ROUTES.diary),
  },
  {
    id: 'logout',
    icon: <LogoutIcon />,
    text: <FormattedMessage id="action.logout" />,
    action: handleLogout,
  },
];

export const navbarItemsNotAuthenticated: ActionItemType[] = [
  {
    id: 'register',
    text: <FormattedMessage id="action.register" />,
    action: (): void => history.push(APP_ROUTES.register),
  },
  {
    id: 'login',
    text: <FormattedMessage id="action.login" />,
    action: (): void => history.push(APP_ROUTES.login),
  },
];
