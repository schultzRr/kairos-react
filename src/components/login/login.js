import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ErrorSnackbar from '../error/errorSnackbar';

import { login } from '../../http/sessionActions';
import loginActions from './loginActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4 + 'px 0' ,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textfield: {
    width: '80%'
  },
  button: {
    marginTop: theme.spacing.unit * 4
  },
  linkContainer: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    color: 'black',
    display: 'inline-block',
    textDecoration: 'none',
    '&:hover': {
      color: 'rgba(146,200,62,1)',
    },
  },
});

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Escribe una dirección de correo electrónico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'No es un correo electrónico válido'
  }
  if (!values.password) {
    errors.password = 'Escribe la contraseña de tu cuenta'
  }
  return errors;
}

const form = {
  form: 'login',
  validate
}


class LoginContainer extends Component {

  handleSnackClose = (event, reason) => {
    this.props.hideError();
  };

  handleSnackExit = (event, reason) => {
    this.props.resetError();
  };

  handleSubmit = (values) => {
    this.props.login(values);
  }

  render() {
    const { classes, handleSubmit, error, displayError } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div>
                <Field
                  name="email"
                  component={TextField}
                  label="Correo electrónico"
                  className={classes.textfield}
                  margin="normal"
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={TextField}
                  label="Contraseña"
                  type="password"
                  className={classes.textfield}
                  margin="normal"
                />
              </div>
              <div>
                <Button 
                  className={classes.button}
                  type="submit" 
                  variant="contained" 
                  color="primary"
                >
                  Entrar
                </Button>
              </div>
              <div className={classes.linkContainer}>
                <Typography variant="body2">
                  <Link to="/register" className={classes.link}>Crear una cuenta</Link>
                </Typography>
                <Typography variant="body2">
                  <a href="mailto:info@prana.mx" className={classes.link}>¿Tienes algún problema?</a>
                </Typography>
              </div>
            </form>
          </Paper>
        </Grid>
        <ErrorSnackbar 
          error={error}
          displayError={displayError}
          handleClose={this.handleSnackClose} 
          handleExited={this.handleSnackExit}
        />
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('login').get('loading'),
    error: state.get('login').get('error'),
    displayError: state.get('login').get('displayError'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ login }, dispatch),
    bindActionCreators(loginActions, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)));
