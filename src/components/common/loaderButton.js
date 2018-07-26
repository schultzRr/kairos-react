import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  buttonContainer: {
    display: 'inline-block',
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  root: {
    height: '3px'
  }
});

class LoaderButton extends Component {

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
          <div className={classes.loader}>
            <LinearProgress className={classes.root}/>
          </div>
        </Fade>
      </div>
    )
  }
}

export default withStyles(styles)(LoaderButton);