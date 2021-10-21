import { CssBaseline } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import ModalProvider from './components/Modal/ModalProvider';
import SidebarProvider from './components/Sidebar/SidebarProvider';
import history from './routes/history';
import MainScreen from './screens/Main';
import store from './store';

const App = (): ReactElement => {
  useEffect(() => {
    //@ts-ignore
    store.dispatch(loadUser());
    // loadUser();??
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <ModalProvider>
          <SidebarProvider>
            <CssBaseline />
            <MainScreen />
          </SidebarProvider>
        </ModalProvider>
      </Router>
    </Provider>
  );
};

export default App;
