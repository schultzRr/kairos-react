import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  warning: {
    backgroundColor: amber[500],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class ErrorSnackbar extends Component {

  render() {
    const { classes, error, displayError, handleClose, handleExited } = this.props;

    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={displayError}
        onClose={handleClose}
        onExited={handleExited}
      >
        <SnackbarContent
          className={classes.warning}
          message={
            <span id="register-snackbar" className={classes.message}>
              <WarningIcon className={classNames(classes.icon, classes.iconVariant)} />
              {error}
            </span>
          }
        />
      </Snackbar>
    )
  }
}

export default withStyles(styles)(ErrorSnackbar);
