import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import LoaderButton from '../common/loaderButton';

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
  selectfield: {
    textAlign: 'start',
    '&:focus': {
      background: 'transparent',
    },
  },
});

class registerAddressForm extends Component {

  render() {
    const { classes, handleSubmit, loading } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="address"
            component={TextField}
            label="Calle, número y colonia *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="city"
            component={TextField}
            label="Ciudad *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="state"
            component={TextField}
            label="Estado *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="zip"
            component={TextField}
            label="Código postal *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="country"
            component={TextField}
            label="País *"
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
          <LoaderButton loading={loading}>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              disabled={loading}
            >
              Registrar
            </Button>
          </LoaderButton>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(registerAddressForm));