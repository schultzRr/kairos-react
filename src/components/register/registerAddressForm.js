import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const form = {
  form: 'register',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}

const styles = theme => ({
  textfield: {
    width: '80%'
  },
  selectfield: {
    textAlign: 'start',
    '&:focus': {
      background: 'transparent',
    },
  },
  button: {
    marginTop: theme.spacing.unit * 4
  },
});

const required = value => (!value ? 'Requerido' : undefined);
const numeric = value =>
  (value && !/^[0-9]*$/i.test(value)
    ? 'El valor debe ser numérico'
    : undefined);

class registerAddressForm extends Component {

  state = {
    age: 10
  }

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="address"
            component={TextField}
            label="Calle, número y colonia *"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="city"
            component={TextField}
            label="Ciudad *"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="state"
            component={TextField}
            label="Estado *"
            validate={[required]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="zip"
            component={TextField}
            label="Código postal *"
            validate={[required, numeric]}
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="country"
            component={TextField}
            label="País *"
            validate={[required]}
            className={classes.textfield}
            inputProps={{
              className: classes.selectfield
            }}
            margin="dense"
            select
          >
            <MenuItem value="México">México</MenuItem>
            <MenuItem value="Colombia">Colombia</MenuItem>
            <MenuItem value="España">España</MenuItem>
          </Field>
        </div>
        <div>
          <Button 
            className={classes.button}
            type="submit"
            variant="contained" 
            color="primary"
          >
            Registrar
          </Button>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(registerAddressForm));