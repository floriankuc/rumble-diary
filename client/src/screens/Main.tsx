import React, { ReactElement } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import AppNavbar from '../containers/Navbar';
import ItemModal from '../containers/AddForm';
import List from '../containers/List';
import Modal from '../components/Modal/Modal';
import LoginModal from '../containers/Login';
import { APP_ROUTES } from '../routes';
import SidebarContainer from '../containers/Sidebar';
import { connect, ConnectedProps } from 'react-redux';
import RegisterModal from '../containers/Register';
import Show from '../containers/EditForm';
import Root from '../components/Root';
import { AppState } from '../reducers';
import { NotFound404 } from '../components/404';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMain extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const MainScreen = (props: IMain) => {
  const renderLoginModal = (): ReactElement => <Modal component={<LoginModal />} />;
  const renderRegisterModal = (): ReactElement => <Modal component={<RegisterModal />} />;
  const location = useLocation();

  const match404 = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';
  const matchAuth = !props.isLoading && !props.isAuthenticated && match404;

  return (
    <div>
      <AppNavbar />
      <SidebarContainer />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '80px 0px', alignItems: 'center' }}>
        <Switch>
          {matchAuth && <Redirect to="/" />}
          <Route path={APP_ROUTES.add} exact component={ItemModal} />
          <Route path={APP_ROUTES.diary} exact component={List} />
          <Route path={APP_ROUTES.show} exact component={Show} />
          <Route path={APP_ROUTES.root} exact={match404} component={Root} />
          {match404 && <Route component={NotFound404} />}
        </Switch>
      </div>
      <Switch>
        <Route path={APP_ROUTES.login} component={renderLoginModal} />
        <Route path={APP_ROUTES.register} component={renderRegisterModal} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.authState.isAuthenticated,
  isLoading: state.authState.isLoading,
});

const connector = connect(mapStateToProps);

export default connector(MainScreen);
