import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, formValueSelector, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { updateAccount, openDialog, closeDialog } from './accountActions';
import dialogs from './accountConstants';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 5,
    maxWidth: '100%',
    width: 500,
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  overlay: {
    background: '#fafafa',
    bottom: 0,
    left: 0,
    opacity: '0.5',
    outline: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,
  }
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChangePhone extends React.Component {

  handleClickOpen = () => {
    this.props.reset();
    this.props.openDialog(dialogs.PHONE_DIALOG);
  };

  handleClose = () => {
    this.props.closeDialog();
  };

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      phone: values.get('phone'),
    }
    this.props.updateAccount(user);
  };

  render() {
    const { classes, handleSubmit, loading, formError, dialog, fullScreen } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Editar
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={dialog == dialogs.PHONE_DIALOG}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          disableRestoreFocus={true}
        >
          { loading && (
            <div className={classes.overlay}>
              <LinearProgress />
            </div>
          )}
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
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
            <div className={classes.dialogContent}>
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
                  autoFocus={true}
                />
              </div>
              <Typography variant="body1" className={classes.error}>
                {formError}
              </Typography>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

ChangePhone.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    loading: state.get('account').get('loading'),
    formError: state.get('account').get('error'),
    dialog: state.get('account').get('dialog'),
    initialValues: {
      phone: state.get('session').get('phone'),
    }
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAccount }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ChangePhone))));