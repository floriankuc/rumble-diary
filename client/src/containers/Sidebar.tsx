import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logout } from '../actions/auth/authActions';
import { ActionItemType } from '../components/ActionItem';
import { navbarItemsAuthenticated, navbarItemsNotAuthenticated } from '../components/Navbar/navigationItems';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { SidebarContext } from '../components/Sidebar/SidebarContext';
import { AppState } from '../reducers';

type PropsFromRedux = ConnectedProps<typeof connector>;

class SidebarContainer extends React.Component<PropsFromRedux> {
  static contextType = SidebarContext;

  handleToggle = (): void => this.context.toggleSidebar(!this.context.open);

  sidebarItemsAuthenticated: ActionItemType[] = navbarItemsAuthenticated.map((item) => ({ ...item, component: 'listItem' }));
  sidebarItemsNotAuthenticated: ActionItemType[] = navbarItemsNotAuthenticated.map((item) => ({ ...item, component: 'listItem' }));

  render(): ReactElement {
    return (
      <Sidebar
        actionItems={this.props.authState.isAuthenticated ? this.sidebarItemsAuthenticated : this.sidebarItemsNotAuthenticated}
        open={this.context.open}
        toggleSidebar={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = ({ authState }: AppState): Pick<AppState, 'authState'> => ({
  authState,
});

const connector = connect(mapStateToProps, { logout });

export default connector(SidebarContainer);
