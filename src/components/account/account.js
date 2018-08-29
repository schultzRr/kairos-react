import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

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
    border: `1px solid ${theme.palette.custom.lightGrey}`,
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  dataContainer: {
    margin: `${theme.spacing.unit * 2}px 0`,
    '&:first-child': {
      marginTop: 0,
    }
  },
  data: {
    color: 'rgba(0, 0, 0, 0.54)',
  }
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
              <Typography variant="title">
                Mi cuenta
              </Typography>
            </div>
            <Grid item xs={12} lg={6}>
              <Paper elevation={0} className={classes.paper}>
                <div className={classes.paperTitleContainer}>
                  <Typography variant="subheading" className={classes.paperTitle}>
                    Datos personales
                  </Typography>
                </div>
                <div className={classes.dataContainer}>
                  <Typography variant="body2">
                    Nombre:
                  </Typography>
                  <Typography variant="body1" className={classes.data}>
                    Ricardo Rosas
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    color="secondary"
                  >
                    Editar
                  </Button>
                </div>
                <Divider />
                <div className={classes.dataContainer}>
                  <Typography variant="body2">
                    Teléfono:
                  </Typography>
                  <Typography variant="body1">
                    5512345123
                  </Typography>
                </div>
                <Divider />
                <div className={classes.dataContainer}>
                  <Typography variant="body2">
                    Contraseña:
                  </Typography>
                  <Typography variant="body1">
                    ********
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