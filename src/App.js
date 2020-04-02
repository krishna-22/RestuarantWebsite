import React from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();

function App() {
  return (
    
    <Provider store={store}>
    <BrowserRouter>
      <div id="parent">
        <Main />
      </div>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
