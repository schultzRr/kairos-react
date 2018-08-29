import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoaderButton from '../common/loaderButton';

const styles = theme => ({
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * -2,
    textAlign: 'right',
  },
});

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Introduce una dirección de correo electrónico'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Introduce un correo electrónico válido';
  }
  return errors;
}

const form = {
  form: 'recoverPassword',
  validate
}

class RecoverPasswordForm extends Component {

  render() {
    const { classes, handleSubmit, loading, error } = this.props;

    return(
      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="body1" align="left">
            Proporciona tu correo electrónico registrado
          </Typography>
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            label="Correo electrónico"
            margin="normal"
            autoFocus={true}
          />
        </div>
        <Typography variant="body1" className={classes.error}>
          {error}
        </Typography>
        <div className={classes.buttonContainer}>
          <LoaderButton loading={loading}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              Recuperar contraseña
            </Button>
          </LoaderButton>
        </div>
      </form>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('forgot').get('loading'),
    error: state.get('forgot').get('error'),
  };
};

function mapDispatchToProps(dispatch) {
  return {}
}

export default withStyles(styles)(reduxForm(form)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPasswordForm)));
