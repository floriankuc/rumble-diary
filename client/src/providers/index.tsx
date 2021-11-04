import { CssBaseline, ThemeProvider } from '@mui/material';
import getUserLocale from 'get-user-locale';
import React, { PropsWithChildren, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import ModalProvider from '../components/Modal/ModalProvider';
import SidebarProvider from '../components/Sidebar/SidebarProvider';
import content from '../i18n';
import history from '../routes/history';
import store from '../store';
import { theme } from '../styles/theme';

const Providers = ({ children }: PropsWithChildren<{}>): ReactElement => {
  const localeShort = (l: string): string => l.slice(0, 2);

  return (
    <IntlProvider locale={localeShort(getUserLocale())} messages={content['en']}>
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <SidebarProvider>
                <CssBaseline />
                {children}
              </SidebarProvider>
            </ModalProvider>
          </ThemeProvider>
        </Router>
      </Provider>
    </IntlProvider>
  );
};

export default Providers;
