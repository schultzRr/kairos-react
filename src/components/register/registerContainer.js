import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
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

import registerActions from './registerActions';

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
  form: 'register',
  initialValues: {
    name: '',
    lastname: '',
    email: '',
  },
}

const required = value => (value == '' ? 'Requerido' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'No es un correo electrónico válido'
    : undefined);

class RegisterContainer extends Component {

  state = {
    showSnack: true
  };

  handleSnackClose = (event, reason) => {
    this.setState({ showSnack: false });
  };

  handleSubmit = (values) => {
    this.setState({ showSnack: true });
    this.props.submitRegister(values);
  }

  render() {
    const { classes, handleSubmit, loading, error } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4}>
          <Paper className={classes.paper}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <div>
                <Field
                  name="name"
                  component={TextField}
                  label="Nombre"
                  validate={[required]}
                  className={classes.textfield}
                  margin="dense"
                  required
                />
              </div>
              <div>
                <Field
                  name="lastname"
                  component={TextField}
                  label="Apellido(s)"
                  validate={[required]}
                  className={classes.textfield}
                  margin="dense"
                  required
                />
              </div>
              <div>
                <Field
                  name="email"
                  component={TextField}
                  label="Correo electrónico"
                  validate={[required, email]}
                  className={classes.textfield}
                  margin="dense"
                />
              </div>
              <div>
                <Button 
                  className={classes.button}
                  type="submit" 
                  variant="contained" 
                  color="primary"
                >
                  Continuar
                </Button>
              </div>
              <div className={classes.linkContainer}>
                <Typography variant="body2">
                  <Link to="/login" className={classes.link}>¿Ya tienes una cuenta registrada?</Link>
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
              <span id="register-snackbar" className={classes.message}>
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
    loading: state.register.loading,
    error: state.register.error,
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(registerActions, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer)));