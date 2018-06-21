import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import loginActions from './loginActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4 + 'px 0' ,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textfield: {
    width: '80%'
  }
});

const form = {
  form: 'login',
  initialValues: {
    email: 'benjamin@coderia.mx',
    password: '123'
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
    snack: true
  };

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snack: false });
  };

  handleSubmit = (values) => {
    return this.props.submitLogin(values);
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
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.snack && error}
          onClose={this.handleSnackClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{error}</span>}
        />
      </Grid>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {};
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators(loginActions, dispatch),
  );
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)));