import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const form = {
  form: 'register',
  initialValues: {
    name: 'Pedro',
    lastname: 'Picapiedra',
    email: 'pedro.picapiedra@gmail.com',
    externalId: '1234',
    sponsorExternalId: '1234',
    placementExternalId: '1234',
    iuvareId: '1234',
    transactionNumber: '1234',
    phone: '123456789',
    password: '12345678',
    confirmation: '123456789',
    address: 'Calle #123',
    city: 'CDMX',
    state: 'CDMX',
    zip: '12345',
    country: 'México',
  },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}

const styles = theme => ({
  textfield: {
    width: '80%'
  },
  button: {
    marginTop: theme.spacing.unit * 4
  },
});

const required = value => (!value ? 'Requerido' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'No es un correo electrónico válido'
    : undefined);
const numeric = value =>
  (value && !/^[0-9]*$/i.test(value)
    ? 'El valor debe ser numérico'
    : undefined);
const phone = value =>
  (value && !/^[0-9 ]{7,20}$/i.test(value)
    ? 'Por favor introduce un teléfono válido'
    : undefined);

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
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="lastname"
            component={TextField}
            label="Apellido(s) *"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            label="Correo electrónico *"
            validate={[required, email]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="externalId"
            component={TextField}
            label="ID Omein *"
            validate={[required, numeric]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="sponsorExternalId"
            component={TextField}
            label="ID Omein de patrocinio *"
            validate={[required, numeric]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="placementExternalId"
            component={TextField}
            label="ID Omein de colocación *"
            validate={[required, numeric]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="iuvareId"
            component={TextField}
            label="ID Iuvare *"
            validate={[required, numeric]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="transactionNumber"
            component={TextField}
            label="Número de registro *"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="phone"
            component={TextField}
            label="Teléfono (sólo números y espacios) *"
            validate={[required, phone]}
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
            validate={[required]}
            className={classes.textfield}
            margin="dense"
            required
          />
        </div>
        <div>
          <Field
            name="confirmation"
            component={TextField}
            type="password"
            label="Confirmar contraseña"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
            required
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
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(registerUserForm));