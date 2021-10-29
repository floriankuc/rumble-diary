import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadUser } from './actions/auth/authActions';
import ModalProvider from './components/Modal/ModalProvider';
import SidebarProvider from './components/Sidebar/SidebarProvider';
import history from './routes/history';
import MainScreen from './screens/Main';
import store from './store';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          html: {
            overflowY: 'scroll',
          },
        },
      },
    },
  },
});

const App = (): ReactElement => {
  useEffect(() => {
    //@ts-ignore
    store.dispatch(loadUser());
    // console.log('loadUser in App fires');
    // loadUser();??
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <SidebarProvider>
              <CssBaseline />
              <MainScreen />
            </SidebarProvider>
          </ModalProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
