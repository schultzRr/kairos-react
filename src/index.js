import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import App from './app';

render(
  <Router>
    <App store={store} />
  </Router>, 
  document.getElementById('root'));

