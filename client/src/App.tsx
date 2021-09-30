import { CssBaseline } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import AppNavbar from './components/AppNavbar';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';
import ItemModal from './components/ItemModal';
import Modal from './components/Modal/Modal';
import ModalStateComponent from './components/Modal/ModalProvider';
import ShoppingList from './components/ShoppingList';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const renderLoginModal = (): ReactElement => <Modal component={<LoginModal />} />;
  const renderRegisterModal = (): ReactElement => <Modal component={<RegisterModal />} />;

  return (
    <Provider store={store}>
      <Router>
        <ModalStateComponent>
          <CssBaseline />
          <AppNavbar />
          <ItemModal />
          <Route path={'/login'} exact component={renderLoginModal} />
          <Route path={'/register'} exact component={renderRegisterModal} />
          <ShoppingList />
        </ModalStateComponent>
      </Router>
    </Provider>
  );
}

export default App;
