import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ItemModal from './components/ItemModal';
import ShoppingList from './components/ShoppingList';
import store from './store';

function App() {
  console.log(process.env);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ItemModal />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
