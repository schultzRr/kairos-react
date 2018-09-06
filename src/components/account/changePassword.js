import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, formValueSelector, Field } from 'redux-form/immutable';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import PasswordField from '../common/passwordField';
import { updateAccount } from './accountActions';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    width: 500, 
    padding: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing.unit * 3,
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChangePassword extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.reset();
  };

  handleSubmit = (values) => {
    const user = {
      id: this.props.id,
      password: values.get('password'),
      password_confirmation: values.get('password'),
    }
    this.props.updateAccount(user)
    .then(response => {
      this.handleClose();
    })
    .catch(e => {});
  };

  render() {
    const { classes, handleSubmit, loading, error, fullScreen } = this.props;

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
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          disableRestoreFocus={true}
        >
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
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
            <div className={classes.dialogContent}>
              <div>
                <PasswordField 
                  name="password"
                  label="Nueva contraseña"
                  margin="dense"
                />
              </div>
              <Typography variant="body1" className={classes.error}>
                {error}
              </Typography>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    error: state.get('account').get('error'),
    loading: state.get('account').get('loading'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateAccount }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ChangePassword))));