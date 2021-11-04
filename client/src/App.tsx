import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadUser } from './actions/auth/authActions';
import ModalProvider from './components/Modal/ModalProvider';
import SidebarProvider from './components/Sidebar/SidebarProvider';
import history from './routes/history';
import MainScreen from './screens/Main';
import store from './store';
import { IntlProvider } from 'react-intl';
import { getUserLocale } from 'get-user-locale';
import content from './i18n';
import { theme } from './styles/theme';

const App = (): ReactElement => {
  useEffect(() => {
    store.dispatch(loadUser() as any);
  }, []);

  const localeShort = (l: string): string => l.slice(0, 2);

  return (
    <IntlProvider locale={localeShort(getUserLocale())} messages={content['en']}>
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
    </IntlProvider>
  );
};

export default App;
