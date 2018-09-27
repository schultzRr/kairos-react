import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import Slide from '@material-ui/core/Slide';
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

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SnackbarNotification extends Component {

  render() {
    const { classes, message, open, variant, handleClose } = this.props;
    const Icon = variantIcon[variant];

    return(
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <SnackbarContent 
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          className={classes[variant]}
        />
      </Snackbar>
    )
  }
}

SnackbarNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  open: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  handleClose: PropTypes.func,
};

export default withStyles(styles)(SnackbarNotification);
