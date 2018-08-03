import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PrivateTemplate from '../../templates/privateTemplate';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const DashboardView = (props) => {
  const { classes } = props;

  return(
    <PrivateTemplate>
      <Grid item>
        <Typography variant="headline">
          ¡Muy Pronto!
        </Typography>
      </Grid>
    </PrivateTemplate>
  )
  
};

export default withStyles(styles)(DashboardView);