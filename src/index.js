import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import store from './app/store.js';
import App from './App';


ReactDOM.render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  </Router>
  ,document.getElementById('root'));
