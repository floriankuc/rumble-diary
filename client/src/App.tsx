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
import { IntlProvider } from 'react-intl';
import { getUserLocale } from 'get-user-locale';
import content from './i18n';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      error: string;
      primary: string;
      default: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      error?: string;
      primary?: string;
      default?: string;
    };
  }
}

const theme = createTheme({
  colors: {
    error: '#D32F2F',
    primary: '#1976D2',
    default: '#C4C4C4',
  },
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

// export const AppWrapperPlain: React.FC<PropsWithChildren<AppWrapperProps>> = (props: PropsWithChildren<AppWrapperProps>): ReactElement => {
//   // const locale = getSupportedLanguage(getCurrentLanguage(), Object.keys(props.messages));

//   const requestedLanguage = props.language ? props.language : getBrowserLanguage();
//   const supportedLanguageCode = getSupportedLanguageCode(requestedLanguage, Object.keys(props.messages));
//   // get localeCode supported by the app / defaults to en-GB
//   const supportedLocalCode = getSupportedLocaleCode(getBrowserLocale(), supportedLanguageCode);
//   // get country supported by the app / defaults to GB or undefined if not defined
//   const supportedCountryCode = getSupportedCountryCode(supportedLocalCode);

//   const i18nContext: I18nContext = {
//     browserDefaults: {
//       languageCode: getBrowserLanguage(),
//       localeCode: getBrowserLocale(),
//       countryCode: getBrowserCountryCode(),
//     },
//     languageCode: supportedLanguageCode,
//     localeCode: supportedLocalCode,
//     countryCode: supportedCountryCode,
//   };

//   const messages = setupMessages(props.messages, i18nContext.languageCode);

//   return (
//     <Provider store={props.store}>
//       <AuthProvider>
//         <SetupApi>
//           <IntlProvider defaultLocale={i18nContext.localeCode} locale={i18nContext.localeCode} key={i18nContext.localeCode} messages={messages}>
//             <I18nContextProvider values={i18nContext}>
//               <BrowserRouter basename={props.routerBasename}>{props.children}</BrowserRouter>
//             </I18nContextProvider>
//           </IntlProvider>
//         </SetupApi>
//       </AuthProvider>
//     </Provider>
//   );
// };
