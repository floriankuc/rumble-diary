import React, { ReactElement, useEffect } from 'react';
import { loadUser } from './actions/auth/authActions';
import Providers from './providers';
import MainScreen from './screens/Main';
import store from './store';

const App = (): ReactElement => {
  useEffect(() => {
    store.dispatch(loadUser() as any);
  }, []);

  return (
    <Providers>
      <MainScreen />
    </Providers>
  );
};

export default App;
