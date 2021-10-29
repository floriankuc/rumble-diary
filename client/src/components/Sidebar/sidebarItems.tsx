import { APP_ROUTES } from '../../routes';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import history from '../../routes/history';
import store from '../../store';
import { logout } from '../../actions/auth/authActions';
import { ActionItemType } from '../ActionItem';

export const sidebarItems: ActionItemType[] = [
  {
    id: 'sidebarAdd',
    icon: <AddIcon />,
    text: 'New entry',
    action: (): void => history.push(APP_ROUTES.add),
    component: 'listItem',
  },
  {
    id: 'sidebardiary',
    icon: <MenuBookIcon />,
    text: 'Diary',
    action: (): void => history.push(APP_ROUTES.diary),
    component: 'listItem',
  },
  {
    id: 'sidebaradd',
    icon: <LogoutIcon />,
    text: 'Logout',
    //@ts-ignore
    action: (): void => store.dispatch(logout()),
    // action: (): void => alert('logout'),
    component: 'listItem',
  },
];

export const sidebarItemsLoggedOut: ActionItemType[] = [
  {
    id: 'register',
    text: 'Register',
    action: (): void => history.push(APP_ROUTES.register),
  },
  {
    id: 'login',
    text: 'Login',
    action: (): void => history.push(APP_ROUTES.login),
  },
];
