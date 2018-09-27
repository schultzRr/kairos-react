import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Account from '../../components/account/account';
import Addresses from '../../components/address/addresses';

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
  title: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 0,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
    '& h1': {
      fontWeight: 500,
    }
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
          <div className={classes.title}>
            <Typography variant="headline">
              Mis datos
            </Typography>
          </div>
          <Grid 
            container 
            alignContent="stretch"
            spacing={32}
          >
            <Grid item xs={12} lg={6}>
              <Account />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Addresses />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProfileView);