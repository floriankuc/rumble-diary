import { CssBaseline } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router2, Switch, Route } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import AppNavbar from './containers/AppNavbar';
import LoginModal from './containers/LoginModal';
import ItemModal from './containers/ItemModal';
import Modal from './components/Modal/Modal';
import ModalProvider from './components/Modal/ModalProvider';
import SidebarProvider from './components/Sidebar/SidebarProvider';
import MainScreen from './containers/Main';
import store from './store';
import { Router, useHistory } from 'react-router';
import RegisterModal from './containers/RegisterModal';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const renderLoginModal = (): ReactElement => <Modal component={<LoginModal />} />;
  const renderRegisterModal = (): ReactElement => <Modal component={<RegisterModal />} />;

  return (
    <Provider store={store}>
      <Router2>
        <ModalProvider>
          <SidebarProvider>
            {/* <CssBaseline /> */}
            <MainScreen />
          </SidebarProvider>
        </ModalProvider>
      </Router2>
    </Provider>
  );
}

export default App;
