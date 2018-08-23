import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
      paddingLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    }
  },
  paper: {
    height: '100%',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class Account extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Grid container 
        justify="center"
        className={classes.root}
      >
        <Grid item xs={12} xl={9}>
          <Grid 
            container 
            alignContent="stretch"
            spacing={32}
            className={classes.container}
          >
            <div className={classes.title}>
              <Typography variant="subheading">
                Mi cuenta
              </Typography>
            </div>
            <Grid item xs={12} lg={6}>
              <Paper square={true} className={classes.paper}>
                <div className={classes.paperTitleContainer}>
                  <Typography variant="subheading" className={classes.paperTitle}>
                    Datos personales
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  
};

export default withStyles(styles)(Account);