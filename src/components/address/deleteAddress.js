import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

import { deleteAddress, openDialog, closeDialog } from './addressActions';
import { Typography } from '@material-ui/core';

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
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.deleteAddress(this.props.address.id);
  }

  render() {
    const { classes, loading, dialog } = this.props;

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
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
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