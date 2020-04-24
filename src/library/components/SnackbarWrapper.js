import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { 
  Snackbar, 
  SnackbarContent, 
  Slide, 
  withStyles 
} from '@material-ui/core';
import {
  CheckCircleOutlined as SuccessIcon,
  WarningOutlined as WarningIcon,
  ReportOutlined as ErrorIcon,
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  warning: {
    backgroundColor: amber[500],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  success: {
    backgroundColor: green[500],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SnackbarWrapper extends Component {

  render() {
    const { classes, message, open, variant, handleClose, handleExit } = this.props;
    const Icon = variantIcon[variant];

    return(
      <>
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          onExited={handleExit}
          TransitionComponent={Transition}
        >
          <SnackbarContent 
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            }
            className={classes[variant]}
          />
        </Snackbar>
      )}
      </>
    )
  }
}

SnackbarWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  open: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  handleClose: PropTypes.func,
  handleExit: PropTypes.func,
};

export default withStyles(styles)(SnackbarWrapper);
