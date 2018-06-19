import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import loginActions from './loginActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const form = {
  form: 'login',
  initialValues: {
    email: '',
    password: ''
  },
}

const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class LoginContainer extends Component {

  handleSubmit = event => {
    event.preventDefault();
    console.log('a');
  }

  render() {
    const { classes } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={10} sm={7} md={4}>
          <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
              <div>
                <Field
                  name="email"
                  component={TextField}
                  label="Correo electrónico"
                  validate={[required, email]}
                  fullWidth
                />
              </div>
              <div>
                <Field
                  name="password"
                  component={TextField}
                  label="Contraseña"
                  validate={[required]}
                  type="password"
                  fullWidth
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </form>
          </Paper>
        </Grid>
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