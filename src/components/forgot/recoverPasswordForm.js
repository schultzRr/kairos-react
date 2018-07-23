import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ButtonLoader from '../common/buttonLoader';

const styles = theme => ({
  error: {
    color: 'red',
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
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

class ForgotContainer extends Component {
  state = {
    loading: false,
    error: ''
  }

  render() {
    const { classes, handleSubmit } = this.props;
    const { loading, error } = this.state;

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
          />
        </div>
        <Typography variant="body1" className={classes.error}>
          {error}
        </Typography>
        <div className={classes.buttonContainer}>
          <ButtonLoader loading={loading}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              color="secondary"
              disabled={loading}
            >
              Recuperar contraseña
            </Button>
          </ButtonLoader>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(ForgotContainer));
