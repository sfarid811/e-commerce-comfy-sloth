import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
//import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>
,
  document.getElementById('root')
);

