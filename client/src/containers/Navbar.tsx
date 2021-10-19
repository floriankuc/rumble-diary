import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/authActions';
import Navbar from '../components/Navbar';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { APP_ROUTES } from '../routes';

function NavbarContainer(props: any) {
  const { isAuthenticated, isLoading } = props.auth;
  const sidebarContext = React.useContext(SidebarContext);
  const history = useHistory();
  const navigateToLogin = () => history.push(APP_ROUTES.login);
  const navigateToRegister = () => history.push(APP_ROUTES.register);
  const toggleSidebar = () => sidebarContext.toggleSidebar(!sidebarContext.open);

  return (
    <Navbar
      isAuthenticated={isAuthenticated}
      toggleSidebar={toggleSidebar}
      navigateToLogin={navigateToLogin}
      navigateToRegister={navigateToRegister}
      logout={props.logout}
    />
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarContainer);
