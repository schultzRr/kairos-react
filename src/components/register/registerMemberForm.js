import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const validate = values => {
  const errors = {}
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

class RegisterMemberForm extends Component {

  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="externalId"
            component={TextField}
            label="ID Omein *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="sponsorExternalId"
            component={TextField}
            label="ID Omein de patrocinio *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="placementExternalId"
            component={TextField}
            label="ID Omein de colocación *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="iuvareId"
            component={TextField}
            label="ID Iuvare *"
            margin="dense"
          />
        </div>
        <div>
          <Field
            name="transactionNumber"
            component={TextField}
            label="Número de registro *"
            margin="dense"
          />
        </div>
        <div>
          <ButtonLoader loading={loading}>
            <Button 
              type="submit" 
              variant="contained" 
              color="secondary"
              disabled={loading}
            >
              Registrar
            </Button>
          </ButtonLoader>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(reduxForm(form)(RegisterMemberForm));