import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flex: 1,
    minWidth: 0, // So the Typography noWrap works
  },
  grid: {
    flexGrow: 1
  },
});

const PublicTemplate = (props) => {
  const { classes } = props;
    
  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <Grid 
          container 
          alignItems="center" 
          justify="center"
          className={classes.grid}
        >
          { props.children }
        </Grid>
      </main>
      <Footer />
    </div>
  )

};

export default withStyles(styles)(PublicTemplate);