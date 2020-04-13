import React, { Component } from 'react';
import clsx from 'clsx';

import { Grid, Typography, withStyles } from '@material-ui/core';

import Account from 'components/account/account';

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: theme.spacing(4, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(0),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  },
});

class ProfileView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container 
        justify="center"
        className={clsx(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title}>
            Mis datos
          </Typography>
          <Grid 
            container 
            alignContent="stretch"
            spacing={4}
          >
            <Grid item xs={12} lg={6}>
              <Account />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileView);