import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  footer: {
    backgroundColor: 'rgba(235,25,126,1)',
    color: 'white',
    fontSize: '0.9rem',
    padding: '1rem',
    textAlign: 'center'
  }
};

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footer}>Todos los derechos reservados © 2018</div>
    )
  }

}

export default withStyles(styles)(Footer);