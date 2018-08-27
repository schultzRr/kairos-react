import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './styles/colors';
import amber from '@material-ui/core/colors/amber'
import App from './app';

axios.defaults.baseURL = 'http://servicios.coderia.mx:8083';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff60ad',
      main: '#9CCC65',
      dark: '#b30052',
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
      white: '#fff',
    },
    background: {
      default: "#fff"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 4,
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
      },
      containedSecondary: {
        '&$disabled': {
          backgroundColor: colors.green,
          color: colors.white
        },
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid #999`,
        },
        '&:after': {
          borderBottom: `2px solid #9CCC65`,
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: '#999',
        '&$focused': {
          color: '#9ccc65',
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

