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
import CloseIcon from '@material-ui/icons/Close';

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
  if (!values.get('name')) {
    errors.name = 'Requerido'
  }
  if (!values.get('lastname')) {
    errors.lastname = 'Requerido'
  }
  return errors;
}

const form = {
  form: 'changeAccountName',
  enableReinitialize: true,
  validate,
}
class ChangeNameForm extends Component {

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      first_name: values.get('name'),
      last_name: values.get('lastname'),
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
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Cambiar mi nombre
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
              name="name"
              component={renderTextField}
              label="Nombre"
              margin="dense"
              helperText=" "
              autoFocus={true}
            />
          </div>
          <div>
            <Field
              name="lastname"
              component={renderTextField}
              label="Apellido(s)"
              margin="dense"
              helperText=" "
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
      name: state.get('session').get('name'),
      lastname: state.get('session').get('lastname'),
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
)(reduxForm(form)(ChangeNameForm)));