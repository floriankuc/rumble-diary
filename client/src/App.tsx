import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import ModalActually from './components/Modal/Modal';
import ModalStateComponent from './components/Modal/ModalStateComponent';
import ShoppingList from './components/ShoppingList';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      {/* <Router> */}
      <ModalStateComponent>
        <ModalActually />
        <CssBaseline />
        <AppNavbar />
        <ItemModal />
        <ShoppingList />
      </ModalStateComponent>
      {/* </Router> */}
    </Provider>
  );
}

export default App;
