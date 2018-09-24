import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import SnackbarNotification from '../notification/snackbar';
import { deleteAddress, openDialog, closeDialog } from './addressActions';
import { dialogs } from './addressConstants';

const styles = theme => ({
  button: {
    color: theme.palette.custom.red,
    '&:hover': {
      backgroundColor: 'rgba(255, 90, 95, 0.08)',
    },
  },
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 4,
    maxWidth: '100%',
    width: 500,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 4,
  }
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeleteAddress extends React.Component {
  state = {
    snackbar: false,
  }

  handleOpen = () => {
    this.props.openDialog(dialogs.DELETE_ADDRESS_DIALOG, this.props.address.id);
  };

  handleClose = () => {
    this.props.closeDialog();
  };

  handleSnackbarClose = () => {
    this.setState({snackbar: false});
  }

  handleDelete = () => {
    this.props.deleteAddress(this.props.address.id);
  }

  render() {
    const { classes, loading, dialog, selectedAddressId, address } = this.props;

    return (
      <React.Fragment>
        <Button
          color="primary"
          onClick={this.handleOpen}
          className={classes.button}
        >
          Eliminar
        </Button>
        <Dialog
          open={(dialog == dialogs.DELETE_ADDRESS_DIALOG) && (selectedAddressId == address.id)}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <div className={classes.dialogContent}>
            <Typography variant="subheading">
              ¿Quieres eliminar esta dirección?
            </Typography>
            <DialogActions className={classes.buttonContainer}>
            <Button 
                color="primary"
                onClick={this.handleClose}
              >
                Cancelar
              </Button>
              <Button 
                variant="contained"
                color="primary"
                onClick={this.handleDelete}
              >
                Eliminar
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    loading: state.get('address').get('loading'),
    formError: state.get('address').get('error'),
    dialog: state.get('address').get('dialog'),
    selectedAddressId: state.get('address').get('selectedAddressId'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ deleteAddress }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAddress));