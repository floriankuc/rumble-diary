import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router2 } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import ModalProvider from './components/Modal/ModalProvider';
import SidebarProvider from './components/Sidebar/SidebarProvider';
import MainScreen from './screens/Main';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router2>
        <ModalProvider>
          <SidebarProvider>
            <CssBaseline />
            <MainScreen />
          </SidebarProvider>
        </ModalProvider>
      </Router2>
    </Provider>
  );
}

export default App;
