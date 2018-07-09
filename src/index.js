import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './app';

axios.defaults.baseURL = 'http://servicios.coderia.mx:8083';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff60ad',
      main: '#eb1a7e',
      dark: '#b30052',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c5fc6e',
      main: '#92c93c',
      dark: '#609800',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 3,
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none',
      }
    },
    MuiFormControl: {
      root: {
        width: '60%',
      }
    }
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>, 
  document.getElementById('root'));

