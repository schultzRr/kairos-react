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
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import SnackbarNotification from '../notification/snackbar';
import { closeDialog } from './accountActions';
import { dialogs } from './accountConstants';

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
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AccountDialog extends React.Component {

  handleClose = () => {
    this.props.closeDialog();
  };

  render() {
    const { classes, loading, dialog, fullScreen } = this.props;
    console.log(dialog)

    return (
      <Dialog
        fullScreen={fullScreen}
        open={dialog != ''}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        disableRestoreFocus={true}
      >
        { loading && (
          <div className={classes.overlay}>
            <LinearProgress />
          </div>
        )}
        {this.props.children}
      </Dialog>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    loading: state.get('account').get('loading'),
    formError: state.get('account').get('error'),
    dialog: state.get('account').get('dialog'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ closeDialog }, dispatch),
  );
}
 
export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDialog)));