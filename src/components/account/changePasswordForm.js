import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Form } from 'redux-form/immutable';

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

import PasswordInput from 'library/components/PasswordInput';
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
  if (!values.get('password')) {
    errors.password = 'Requerido';
  } else if (values.get('password').length < 8) {
    errors.password = 'Usa al menos 8 caracteres';
  }
  return errors;
}

const form = {
  form: 'changeAccountPassword',
  enableReinitialize: true,
  validate,
}

class ChangePasswordForm extends Component {

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      password: values.get('password'),
      password_confirmation: values.get('password'),
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
              Cambiar mi contraseña
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
            <PasswordInput 
              name="password"
              label="Nueva contraseña"
              margin="dense"
              helperText=" "
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
)(reduxForm(form)(ChangePasswordForm)));