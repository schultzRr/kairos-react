import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navigation from '../components/navigation/navigation';
import Menu from '../components/menu/menu';

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
    flexDirection: 'row',
    flexGrow: 1,
    flex: 1,
    minWidth: 0, // So the Typography noWrap works
  },
});

const PrivateTemplate = (props) => {
  const { classes } = props;
    
  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <Menu />
        <Grid container>
          { props.children }
        </Grid>
      </main>
    </div>
  )

};

export default withStyles(styles)(PrivateTemplate);