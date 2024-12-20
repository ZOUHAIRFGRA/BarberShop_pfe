import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';
import './index.css';
import App from './App';
import { BrowserRouter  } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { inject } from '@vercel/analytics';
 
inject();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
   < BrowserRouter> <App /></BrowserRouter>

    
     
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
