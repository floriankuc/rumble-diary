import React, { ReactElement } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import AppNavbar from '../containers/Navbar';
import ItemModal from '../containers/AddForm';
import ShoppingList from '../containers/ShoppingList';
import Modal from '../components/Modal/Modal';
import LoginModal from '../containers/Login';
import { APP_ROUTES } from '../routes';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { connect, ConnectedProps } from 'react-redux';
import { sidebarItems } from '../components/Sidebar/sidebarItems';
import RegisterModal from '../containers/RegisterModal';
import Show from '../containers/EditForm';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMain extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const MainScreen = (props: IMain) => {
  const renderLoginModal = (): ReactElement => <Modal component={<LoginModal />} />;
  const renderRegisterModal = (): ReactElement => <Modal component={<RegisterModal />} />;
  const location = useLocation();

  return (
    <div>
      <AppNavbar />
      <Sidebar actionItems={sidebarItems} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Switch>
          {!props.isAuthenticated &&
            props.isAuthenticated !== null &&
            !props.isLoading &&
            location.pathname !== '/' &&
            location.pathname !== '/login' &&
            location.pathname !== '/register' && <Redirect to="/" />}
          <Route path={APP_ROUTES.start} exact component={(): ReactElement => <div>start</div>} />
          <Route path={APP_ROUTES.add} exact component={ItemModal} />
          <Route path={APP_ROUTES.diary} exact component={ShoppingList} />
          <Route path={APP_ROUTES.show} exact component={Show} />
          <Route path={APP_ROUTES.root} component={(): ReactElement => <div>root</div>} />
        </Switch>
      </div>
      <Switch>
        <Route path={APP_ROUTES.login} component={renderLoginModal} />
        <Route path={APP_ROUTES.register} component={renderRegisterModal} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const connector = connect(mapStateToProps);

export default connector(MainScreen);
