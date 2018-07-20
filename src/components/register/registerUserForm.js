import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PasswordField from '../common/passwordField';

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Requerido';
  }
  if (!values.lastname) {
    errors.lastname = 'Requerido';
  }
  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Introduce un correo electrónico válido';
  }
  if (!values.phone) {
    errors.phone = 'Requerido';
  } else if (!/^[0-9 ]{7,20}$/i.test(values.phone)) {
    errors.phone = 'Introduce sólo números y espacios';
  }
  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length < 8) {
    errors.password = 'Usa al menos 8 caracteres';
  }
  if (!values.confirmation) {
    errors.confirmation = 'Requerido';
  } else if (values.confirmation != values.password) {
    errors.confirmation = 'Las contraseñas deben ser iguales';
  }
  return errors;
}

const form = {
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
}

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 4
  },
});

class RegisterUserForm extends Component {

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={TextField}
            label="Nombre *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="lastname"
            component={TextField}
            label="Apellido(s) *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            label="Correo electrónico *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="phone"
            component={TextField}
            label="Teléfono *"
            helperText="Sólo números y espacios"
            inputProps={{
              maxLength: 15,
            }}
            margin="dense"
          />
        </div>
        <div>
          <PasswordField 
            name="password"
            label="Contraseña"
            margin="dense"
          />
        </div>
        <div>
          <PasswordField 
            name="confirmation"
            label="Confirmar contraseña"
            margin="dense"
          />
        </div>
        <div>
          <Button 
            className={classes.button}
            type="submit"
            variant="contained" 
            color="secondary"
          >
            Siguiente >
          </Button>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(RegisterUserForm));