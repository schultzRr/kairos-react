import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form } from 'redux-form/immutable';
import { renderTextField } from 'library/utils/inputs';

import { 
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  withStyles 
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { updateAccount } from './accountActions';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing(6),
    paddingBottom: theme.spacing(7),
    maxWidth: '100%',
    width: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
    textAlign: 'left'
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('phone')) {
    errors.phone = 'Requerido';
  } else if (!/^[0-9 ]{7,20}$/i.test(values.get('phone'))) {
    errors.phone = 'Introduce sólo números y espacios';
  }
  return errors;
}

const form = {
  form: 'changeAccountPhone',
  enableReinitialize: true,
  validate,
}

class ChangePhoneForm extends Component {

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      phone: values.get('phone'),
    }
    this.props.updateAccount(user);
  };

  render() {
    const { classes, handleClose, handleSubmit, formError } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <Close />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Cambiar mi teléfono
            </Typography>
            <Button 
              type="submit"
              color="inherit" 
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <div>
            <Field
              name="phone"
              component={renderTextField}
              label="Teléfono *"
              helperText="Sólo números y espacios"
              inputProps={{
                maxLength: 15,
              }}
              margin="dense"
              autoFocus={true}
            />
          </div>
          { formError && (
            <Typography variant="body2" className={classes.error}>
              {formError}
            </Typography>
          )}
        </DialogContent>
      </Form>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    formError: state.get('account').get('error'),
    initialValues: {
      phone: state.get('session').get('phone'),
    }
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAccount }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ChangePhoneForm)));