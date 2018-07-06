import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    errors.email = 'No es un correo electrónico válido';
  }
  if (!values.externalId) {
    errors.externalId = 'Requerido';
  } else if (isNaN(Number(values.externalId))) {
    errors.externalId = 'Por favor introduce un ID Omein válido';
  }
  if (!values.sponsorExternalId) {
    errors.sponsorExternalId = 'Requerido';
  } else if (isNaN(Number(values.sponsorExternalId))) {
    errors.sponsorExternalId = 'Por favor introduce un ID Omein de patrocinio válido';
  }
  if (!values.placementExternalId) {
    errors.placementExternalId = 'Requerido';
  } else if (isNaN(Number(values.placementExternalId))) {
    errors.placementExternalId = 'Por favor introduce un ID Omein de colocación válido';
  }
  if (!values.iuvareId) {
    errors.iuvareId = 'Requerido';
  }
  if (!values.transactionNumber) {
    errors.transactionNumber = 'Requerido';
  }
  if (!values.phone) {
    errors.phone = 'Requerido';
  } else if (!/^[0-9 ]{7,20}$/i.test(values.phone)) {
    errors.phone = 'Por favor introduce un teléfono válido';
  }
  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length < 8) {
    errors.password = 'Usa al menos 8 caracteres';
  }
  if (!values.confirmation) {
    errors.confirmation = 'Requerido';
  } else if (values.confirmation != values.password) {
    errors.confirmation = 'Las contraseñas no coinciden';
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
  textfield: {
    width: '80%'
  },
  button: {
    marginTop: theme.spacing.unit * 4
  },
});

class registerUserForm extends Component {

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={TextField}
            label="Nombre *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="lastname"
            component={TextField}
            label="Apellido(s) *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            label="Correo electrónico *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="externalId"
            component={TextField}
            label="ID Omein *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="sponsorExternalId"
            component={TextField}
            label="ID Omein de patrocinio *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="placementExternalId"
            component={TextField}
            label="ID Omein de colocación *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="iuvareId"
            component={TextField}
            label="ID Iuvare *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="transactionNumber"
            component={TextField}
            label="Número de registro *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="phone"
            component={TextField}
            label="Teléfono (sólo números y espacios) *"
            inputProps={{
              maxLength: 15,
            }}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="password"
            component={TextField}
            type="password"
            label="Contraseña"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="confirmation"
            component={TextField}
            type="password"
            label="Confirmar contraseña"
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
            Siguiente >
          </Button>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(registerUserForm));