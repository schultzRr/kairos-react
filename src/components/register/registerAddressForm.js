import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

const validate = values => {
  const errors = {}
  if (!values.address) {
    errors.address = 'Requerido';
  }
  if (!values.city) {
    errors.city = 'Requerido';
  }
  if (!values.state) {
    errors.state = 'Requerido';
  }
  if (!values.zip) {
    errors.zip = 'Requerido';
  } else if (isNaN(Number(values.zip)) || values.zip.length < 3 || values.zip.length > 8 ) {
    errors.zip = 'Por favor introduce un código postal válido';
  }
  if (!values.country) {
    errors.country = 'Requerido';
  }
  return errors;
}

const form = {
  form: 'register',
  validate
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
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="city"
            component={TextField}
            label="Ciudad *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="state"
            component={TextField}
            label="Estado *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="zip"
            component={TextField}
            label="Código postal *"
            className={classes.textfield}
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="country"
            component={TextField}
            label="País *"
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