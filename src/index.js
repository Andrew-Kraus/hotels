import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/nullstyle.css';
import './style/style.css';
import './fonts/fonts.css';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

