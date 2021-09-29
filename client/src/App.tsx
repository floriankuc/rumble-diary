import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import ShoppingList from './components/ShoppingList';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <CssBaseline />
      <AppNavbar />
      <ItemModal />
      <ShoppingList />
    </Provider>
  );
}

export default App;
