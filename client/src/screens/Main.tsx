import React, { ReactElement } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import AppNavbar from '../components/AppNavbar';
import ItemModal from '../components/ItemModal';
import ShoppingList from '../components/ShoppingList';
import Modal from '../components/Modal/Modal';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import { APP_ROUTES } from '../routes';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { connect, ConnectedProps } from 'react-redux';
import { sidebarItems } from '../components/Sidebar/sidebarItems';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMain extends PropsFromRedux {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const Main = (props: IMain) => {
  const renderLoginModal = (): ReactElement => <Modal component={<LoginModal />} />;
  const renderRegisterModal = (): ReactElement => <Modal component={<RegisterModal />} />;
  const location = useLocation();

  return (
    <div>
      <AppNavbar />
      <Sidebar actionItems={sidebarItems} />
      <Switch>
        {!props.isAuthenticated && props.isAuthenticated !== null && !props.isLoading && location.pathname !== '/' && location.pathname !== '/login' && (
          <Redirect to="/" />
        )}
        <Route path={APP_ROUTES.start} exact component={(): ReactElement => <div>start</div>} />
        <Route path={APP_ROUTES.add} exact component={ItemModal} />
        <Route path={APP_ROUTES.diary} exact component={ShoppingList} />
        <Route path={APP_ROUTES.show} exact component={(): ReactElement => <div>show</div>} />
        <Route path={APP_ROUTES.root} component={(): ReactElement => <div>root</div>} />
      </Switch>
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

export default connector(Main);
