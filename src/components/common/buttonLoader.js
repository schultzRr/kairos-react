import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  buttonContainer: {
    display: 'inline-block',
    marginTop: theme.spacing.unit * 4,
    paddingLeft: 36,
    paddingRight: 36,
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    right: 0,
    top: 6
  },
});

class ButtonLoader extends Component {

  render(){
    const { classes, loading } = this.props;

    return(
      <div className={classes.buttonContainer}>
        {this.props.children}
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '500ms' : '0ms',
          }}
          unmountOnExit
        >
          <div>
            <LinearProgress />
          </div>
        </Fade>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonLoader);