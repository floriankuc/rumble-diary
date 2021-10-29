import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../actions/auth/authActions';
import { ActionItemType } from '../components/ActionItem';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { AppState } from '../reducers';

type PropsFromRedux = ConnectedProps<typeof connector>;

class SidebarContainer extends React.Component<PropsFromRedux> {
  static contextType = SidebarContext;

  handleToggle = (): void => this.context.toggleSidebar(!this.context.open);

  sidebarItemsAuthenticated: ActionItemType[] = [
    {
      id: 'add',
      icon: <AddIcon />,
      text: 'New entry',
      action: (): void => history.push(APP_ROUTES.add),
      component: 'listItem',
    },
    {
      id: 'diary',
      icon: <MenuBookIcon />,
      text: 'Diary',
      action: (): void => history.push(APP_ROUTES.diary),
      component: 'listItem',
    },
    {
      id: 'logout',
      icon: <LogoutIcon />,
      text: 'Logout',
      action: this.props.logout,
      component: 'listItem',
    },
  ];

  sidebarItemsNotAuthenticated: ActionItemType[] = [
    {
      id: 'register',
      text: 'Register',
      action: (): void => history.push(APP_ROUTES.register),
      component: 'listItem',
    },
    {
      id: 'login',
      text: 'Login',
      action: (): void => history.push(APP_ROUTES.login),
      component: 'listItem',
    },
  ];

  render() {
    return (
      <Sidebar
        actionItems={this.props.authState.isAuthenticated ? this.sidebarItemsAuthenticated : this.sidebarItemsNotAuthenticated}
        open={this.context.open}
        toggleSidebar={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = ({ authState }: AppState) => ({
  authState,
});

const connector = connect(mapStateToProps, { logout });

export default connector(SidebarContainer);
