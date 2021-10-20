import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../actions/authActions';
import Navbar from '../components/Navbar';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { APP_ROUTES } from '../routes';
import history from '../routes/history';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface NavbarContainerProps {}

export interface NavbarReduxProps extends PropsFromRedux {
  auth: any;
}
class NavbarContainer extends React.Component<NavbarContainerProps & NavbarReduxProps> {
  static contextType = SidebarContext;

  navigateToLogin = () => history.push(APP_ROUTES.login);
  navigateToRegister = () => history.push(APP_ROUTES.register);
  toggleSidebar = () => this.context.toggleSidebar(!this.context.open);

  render() {
    return (
      <Navbar
        isAuthenticated={this.props.auth.isAuthenticated}
        toggleSidebar={this.toggleSidebar}
        navigateToLogin={this.navigateToLogin}
        navigateToRegister={this.navigateToRegister}
        logout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, { logout });

export default connector(NavbarContainer);
