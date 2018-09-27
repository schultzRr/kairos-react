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
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';

import SnackbarNotification from '../notification/snackbar';
import { updateAddress, openDialog, closeDialog } from './addressActions';
import { dialogs } from './addressConstants';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    maxWidth: '100%',
    width: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectfield: {
    textAlign: 'start',
    '&:focus': {
      background: 'transparent',
    },
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
  },
  snackbar: {
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const validate = values => {
  const errors = {}
  if (!values.get('address')) {
    errors.address = 'Requerido';
  }
  if (!values.get('city')) {
    errors.city = 'Requerido';
  }
  if (!values.get('state')) {
    errors.state = 'Requerido';
  }
  if (!values.get('zip')) {
    errors.zip = 'Requerido';
  } else if (isNaN(Number(values.get('zip'))) || values.get('zip').length < 3 || values.get('zip').length > 8 ) {
    errors.zip = 'Por favor introduce un código postal válido';
  }
  if (!values.get('country')) {
    errors.country = 'Requerido';
  }
  return errors;
}

const form = {
  form: 'editAddress',
  enableReinitialize: true,
  validate
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditAddress extends React.Component {
  state = {
    snackbar: false,
  }

  handleOpen = () => {
    this.props.reset();
    this.props.openDialog(dialogs.EDIT_ADDRESS_DIALOG, this.props.address.id);
  };

  handleClose = () => {
    this.props.closeDialog();
  };

  handleSnackbarClose = () => {
    this.setState({snackbar: false});
  }

  handleSubmit = (values) => {
    this.props.updateAddress(values)
    .then(response => {
      this.setState({snackbar: true})
    });
  };

  render() {
    const { classes, handleSubmit, loading, formError, dialog, selectedAddressId, address, fullScreen } = this.props;

    return (
      <React.Fragment>
        <Button
          size="small"
          color="primary"
          onClick={this.handleOpen}
        >
          Editar
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={(dialog == dialogs.EDIT_ADDRESS_DIALOG) && (selectedAddressId == address.id)}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          disableRestoreFocus={true}
        >
          { loading && (
            <div className={classes.overlay}>
              <LinearProgress />
            </div>
          )}
          <form onSubmit={handleSubmit(this.handleSubmit)} className={classes.form}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Editar dirección
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
                  name="address"
                  component={TextField}
                  label="Calle, número y colonia *"
                  margin="dense"
                  autoFocus={true}
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
              <Typography variant="body1" className={classes.error}>
                {formError}
              </Typography>
            </DialogContent>
          </form>
        </Dialog>
        <SnackbarNotification 
          message="Dirección actualizada correctamente"
          open={this.state.snackbar}
          handleClose={this.handleSnackbarClose}
          variant="success"
        />
      </React.Fragment>
    );
  }
}

EditAddress.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    loading: state.get('address').get('loading'),
    formError: state.get('address').get('error'),
    dialog: state.get('address').get('dialog'),
    selectedAddressId: state.get('address').get('selectedAddressId'),
    initialValues: props.address,
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAddress }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(EditAddress))));