import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';

import { closeDialog } from './addressActions';

const styles = theme => ({
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

class AddressDialog extends React.Component {

  handleClose = () => {
    this.props.closeDialog();
  };

  render() {
    const { classes, loading, openDialog, fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
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

AddressDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    loading: state.get('address').get('loading'),
    formError: state.get('address').get('error'),
    openDialog: state.get('address').get('openDialog'),
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
)(AddressDialog)));