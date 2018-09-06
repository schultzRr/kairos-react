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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
  }
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChangeName extends React.Component {
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
      first_name: values.get('name'),
      last_name: values.get('lastname'),
    }
    this.props.updateAccount(user)
    .then(response => {
      this.handleClose();
    });
  };

  render() {
    const { classes, handleSubmit, fullScreen } = this.props;

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
                  name="name"
                  component={TextField}
                  label="Nombre"
                  margin="dense"
                  autoFocus={true}
                />
              </div>
              <div>
                <Field
                  name="lastname"
                  component={TextField}
                  label="Apellido(s)"
                  margin="dense"
                />
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

ChangeName.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
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
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm(form)(ChangeName))));