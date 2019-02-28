import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Navigation from '../../components/navigation/shopNavigation';
import Checkout from '../../components/shop/checkout/checkout';
import Summary from '../../components/shop/summary/summary';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flex: 1,
    minWidth: 0, // So the Typography noWrap works,
  },
  content: {
    width: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
  }
});

class CheckoutView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navigation />
        <div className={classes.main}>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Checkout />
          </div>
          <Summary />
        </div>
      </div>
    )
  }
 
}

export default withStyles(styles)(withRouter(CheckoutView));