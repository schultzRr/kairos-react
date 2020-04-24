import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

import { Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles 
} from '@material-ui/core';

import { getSummary } from './dashboardActions';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    height: 48,
  },
}))(TableCell);

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
      paddingLeft: 0,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  },
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6),
    },
  },
  fullHeight: {
    height: '100%',
  },
  subtitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  table: {
    margin: `0 -${theme.spacing(4)}px`,
    width: `calc(100% + ${theme.spacing(8)}px)`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      width: '100%',
    },
  },
  tableHead: {
    height: 48,
  },
  img: {
    height: 30,
  },
});

class Dashboard extends Component {

  componentDidMount() {
    this.props.getSummary();
  }

  render() {
    const { classes } = this.props;
    const summary = this.props.summary ? this.props.summary.toJS() : null;

    return (
      <Grid container 
        justify="center"
        className={clsx(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title}>
            Resumen
          </Typography>
          {
            summary && (
              <Grid 
                container 
                alignContent="stretch"
                spacing={4}
              >
                <Grid item xs={12} lg={6}>
                  <Paper elevation={0} className={clsx(classes.paper, classes.fullHeight)}>
                    <div>
                      <div className={classes.subtitleContainer}>
                        <Typography variant="h6">
                          <img src="/images/omein/logo.png" className={classes.img} alt="Logo Omein"/>
                        </Typography>
                        <Typography variant="subtitle1">
                          Rango máximo: {summary.ranks.max}
                        </Typography>
                      </div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <CustomTableCell></CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.name}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.name}</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <CustomTableCell>Vol. personal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.omein_vp}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.omein_vp}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Vol. grupal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.omein_vg}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.omein_vg}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Rango calificado</CustomTableCell>
                            <CustomTableCell align="right">-</CustomTableCell>
                            <CustomTableCell align="right">{summary.ranks.previous}</CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Paper elevation={0} className={clsx(classes.paper, classes.fullHeight)}>
                    <div>
                      <div className={classes.subtitleContainer}>
                        <Typography variant="h6">
                          <img src="/images/prana/logo-gris.png" className={classes.img} alt="Logo Prana"/>
                        </Typography>
                      </div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <CustomTableCell></CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.name}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.name}</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <CustomTableCell>Vol. personal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.prana_vp}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.prana_vp}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Vol. grupal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.prana_vg}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.prana_vg}</CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            )
          }
        </Grid>
      </Grid>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    email: state.get('session').get('email'),
    summary: state.get('dashboard').get('summary'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getSummary }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)));
