import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../actions/auth/authActions';
import Navbar from '../components/Navbar';
import { navbarItemsAuthenticated, navbarItemsNotAuthenticated } from '../components/Navbar/navigationItems';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { AppState } from '../reducers';

type PropsFromRedux = ConnectedProps<typeof connector>;

class NavbarContainer extends React.Component<PropsFromRedux> {
  static contextType = SidebarContext;

  handleToggle = (): void => this.context.toggleSidebar(!this.context.open);

  render() {
    return (
      <Navbar actionItems={this.props.authState.isAuthenticated ? navbarItemsAuthenticated : navbarItemsNotAuthenticated} toggleSidebar={this.handleToggle} />
    );
  }
}

const mapStateToProps = ({ authState }: AppState) => ({
  authState,
});

const connector = connect(mapStateToProps, { logout });

export default connector(NavbarContainer);
