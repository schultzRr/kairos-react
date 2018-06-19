import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  footer: {
    backgroundColor: 'rgba(235,25,126,1)',
    color: 'white',
    fontSize: '0.9rem',
    padding: '1rem',
    textAlign: 'center'
  },
  text: {
    color: 'white',
  }
};

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footer}>
        <Typography variant="body1" align="center" className={classes.text}>
          Todos los derechos reservados © 2018
        </Typography>
      </div>
    )
  }

}

export default withStyles(styles)(Footer);