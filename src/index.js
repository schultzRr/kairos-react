import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import colors from './styles/colors';
import App from './app';

axios.defaults.baseURL = 'http://servicios.coderia.mx:8083';

const mainColor = blue[500];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor,
      contrastText: '#fff',
    },
    secondary: {
      light: '#616161',
      main: '#111',
      dark: '#000',
      contrastText: '#f4f4f4',
    },
    error: {
      main: '#ff5a5f',
    },
    custom: {
      lightGrey: '#f4f4f4',
      darkGrey: '#111',
      white: '#fff',
      background: '#111',
      red: '#ff5a5f',
    },
    background: {
      default: "#fff"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid #999`,
        },
        '&:after': {
          borderBottom: `2px solid ${mainColor}`,
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: '#999',
        '&$focused': {
          color: mainColor,
        },
        '&$error': {
          color: '#999',
        },
      },
      focused: {
        '&$error': {
          color: '#ff5a5f',
        },
      }
    },
    MuiFormControl: {
      root: {
        width: '100%',
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

