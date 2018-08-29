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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    height: 48,
  },
}))(TableCell);

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
  table: {
    margin: `0 -${theme.spacing.unit * 4}px`,
    width: `calc(100% + ${theme.spacing.unit * 8}px)`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      width: '100%',
    },
  },
  tableHead: {
    height: 48,
  },
  lastRank: {
    paddingTop: theme.spacing.unit * 3,
    paddinBottom: theme.spacing.unit * 3,
  }
});

class DashboardView extends Component {

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
                Resumen
              </Typography>
            </div>
            <Grid item xs={12} lg={6}>
              <Paper elevation={0} className={classes.paper}>
                <div>
                  <div className={classes.paperTitleContainer}>
                    <Typography variant="subheading" className={classes.paperTitle}>
                      Omein
                    </Typography>
                    <Typography variant="subheading" className={classes.paperTitle}>
                      Rango: 20K
                    </Typography>
                  </div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow className={classes.tableHead}>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell numeric>Julio</CustomTableCell>
                        <CustomTableCell numeric>Junio</CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <CustomTableCell>Vol. personal</CustomTableCell>
                        <CustomTableCell numeric>1000</CustomTableCell>
                        <CustomTableCell numeric>5000</CustomTableCell>
                      </TableRow>
                      <TableRow>
                        <CustomTableCell>Vol. grupal</CustomTableCell>
                        <CustomTableCell numeric>5000</CustomTableCell>
                        <CustomTableCell numeric>8000</CustomTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="body1" align="right" className={classes.lastRank}>
                    Último rango calificado: 5K
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper elevation={0} className={classes.paper}>
                <div>
                  <div className={classes.paperTitleContainer}>
                    <Typography variant="subheading" className={classes.paperTitle}>
                      Prana
                    </Typography>
                  </div>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow className={classes.tableHead}>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell numeric>Junio</CustomTableCell>
                        <CustomTableCell numeric>Julio</CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <CustomTableCell>Ptos. personales</CustomTableCell>
                        <CustomTableCell numeric>1000</CustomTableCell>
                        <CustomTableCell numeric>5000</CustomTableCell>
                      </TableRow>
                      <TableRow>
                        <CustomTableCell>Ptos. grupales</CustomTableCell>
                        <CustomTableCell numeric>5000</CustomTableCell>
                        <CustomTableCell numeric>8000</CustomTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
  
};

export default withStyles(styles)(DashboardView);