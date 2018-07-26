import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttonContainer: {
    display: 'inline-block',
    position: 'relative'
  },
  link: {
    textDecoration: 'none',
  },
  root: {
    height: '3px'
  }
});

class LoaderButton extends Component {

  render(){
    const { classes, to, text } = this.props;

    return(
      <Link to={to} className={classes.link}>
        <Button 
          variant="contained" 
          size="large"
          color="secondary"
        >
          {text}
        </Button>
      </Link>
    )
  }
}

export default withStyles(styles)(LoaderButton);