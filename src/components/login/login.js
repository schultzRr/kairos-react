import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';

import { login } from '../../http/sessionActions';

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
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const form = {
  form: 'login',
  initialValues: {
    email: 'benjamin@coderia.mx',
    password: 'password'
  },
}

const requiredEmail = value => (value == '' ? 'Escribe una dirección de correo electrónico' : undefined);
const requiredPassword = value => (value == '' ? 'Escribe la contraseña de tu cuenta' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'No es un correo electrónico válido'
    : undefined);

class LoginContainer extends Component {

  state = {
    showSnack: true
  };

  handleSnackClose = (event, reason) => {
    this.setState({ showSnack: false });
  };

  handleSubmit = (values) => {
    this.setState({ showSnack: true });
    this.props.login(values);
  }

  render() {
    const { classes, handleSubmit, error } = this.props;

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
                  validate={[requiredEmail, email]}
                  className={classes.textfield}
                  margin="normal"
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={TextField}
                  label="Contraseña"
                  validate={[requiredPassword]}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={error != '' && this.state.showSnack}
          onClose={this.handleSnackClose}
        >
          <SnackbarContent
            className={classes.warning}
            message={
              <span id="login-snackbar" className={classes.message}>
                <WarningIcon className={classNames(classes.icon, classes.iconVariant)} />
                {error}
              </span>
            }
          />
        </Snackbar>
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('login').get('loading'),
    error: state.get('login').get('error'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ login }, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)));
