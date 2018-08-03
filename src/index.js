import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import colors from './styles/colors';
import App from './app';

axios.defaults.baseURL = 'http://servicios.coderia.mx:8083';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff60ad',
      main: colors.pink,
      dark: '#b30052',
      contrastText: '#fff',
    },
    secondary: {
      light: '#c5fc6e',
      main: colors.green,
      dark: '#609800',
      contrastText: '#fff',
    },
    background: {
      default: "#f4f4f4"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
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

