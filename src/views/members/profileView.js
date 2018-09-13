import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Account from '../../components/account/account';
import Adresses from '../../components/adress/adresses';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
    },
  },
});

class ProfileView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Grid 
            container 
            alignContent="stretch"
            spacing={32}
          >
            <Grid item xs={12} lg={6}>
              <Account />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Adresses />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileView);