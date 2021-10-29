import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../actions/auth/authActions';
import { ActionItemType } from '../components/ActionItem';
import Navbar from '../components/Navbar';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { AppState } from '../reducers';

type PropsFromRedux = ConnectedProps<typeof connector>;

class NavbarContainer extends React.Component<PropsFromRedux> {
  static contextType = SidebarContext;

  handleToggle = (): void => this.context.toggleSidebar(!this.context.open);

  navbarItemsAuthenticated: ActionItemType[] = [
    {
      id: 'add',
      icon: <AddIcon />,
      text: 'New entry',
      action: (): void => history.push(APP_ROUTES.add),
    },
    {
      id: 'diary',
      icon: <MenuBookIcon />,
      text: 'Diary',
      action: (): void => history.push(APP_ROUTES.diary),
    },
    {
      id: 'logout',
      icon: <LogoutIcon />,
      text: 'Logout',
      action: (): Promise<void> => this.props.logout(),
    },
  ];

  navbarItemsNotAuthenticated: ActionItemType[] = [
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

  render() {
    return (
      <Navbar
        actionItems={this.props.authState.isAuthenticated ? this.navbarItemsAuthenticated : this.navbarItemsNotAuthenticated}
        toggleSidebar={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = ({ authState }: AppState) => ({
  authState,
});

const connector = connect(mapStateToProps, { logout });

export default connector(NavbarContainer);
