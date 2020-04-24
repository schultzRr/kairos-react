import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import clsx from 'clsx';

import { 
  Grid,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  withStyles 
} from '@material-ui/core';
import { Event } from '@material-ui/icons';

import Snackbar from 'library/components/SnackbarWrapper';
import DownlinesTable from './downlinesTable';
import EmailButton from './emailButton';
import { 
  getDownlinesData,
  sendMonthlyDetail,
  closeNotification,
  exitNotification
} from './downlinesActions';

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
  },
  toolBar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 6),
    },
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchFieldContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  searchField: {
    marginRight: theme.spacing(2),
    width: 180,
  },
});

class Downlines extends Component {
  
  state = {
    period: moment(),
    expandedRowIds: [this.props.id]
  };

  handlePeriodChange = date => {
    this.setState({ period: date });
  };

  sendMonthlyDetail = () => {
    const period = this.state.period.clone();
    this.props.sendMonthlyDetail(
      period.startOf('month').format(),
      period.add(1, 'month').startOf('month').format(),
      this.props.email,
    );
  }

  loadData = (id, level) => {
    const period = this.state.period.clone();
    return this.props.getDownlinesData(
      id,
      period.startOf('month').format(),
      period.add(1, 'month').startOf('month').format(),
      level,
    );
  }

  getClickedDownlineData = (row) => {
    const data = this.props.data ? this.props.data.toJS() : null;
    const { expandedRowIds } = this.state;

    if(expandedRowIds.indexOf(row.id) > -1) {
      this.setState({
        expandedRowIds: expandedRowIds.filter((rowId) => { 
          return rowId !== row.id;
        })
      });
    } else {
      if(this.filterRowChildren(row, data).length == 0 ) {
        this.loadData(row.id, row.level)
        .then(() => {
          this.setState({
            expandedRowIds: [...expandedRowIds, row.id]
          })
        })
        .catch(e => {});
      } else {
        this.setState({
          expandedRowIds: [...expandedRowIds, row.id]
        })
      }
    }
  }

  filterRowChildren = (row, rows) => {
    return rows.filter(a => a.parentId === row.externalId);
  }

  handleNotificationClose = () => {
    this.props.closeNotification();
  }

  handleNotificationExit = () => {
    this.props.exitNotification();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.period.startOf('month').format() !== prevState.period.startOf('month').format()) {
      this.loadData(this.props.id, 0);
    }
  }

  componentDidMount() {
    this.loadData(this.props.id, 0);
  }

  render() {
    const { 
      classes,
      loading,
      loadingEmail,
      errorEmail,
      snackbarMessage,
      openSnackbar
    } = this.props;
    const data = this.props.data ? this.props.data.toJS() : null;
    const { period, expandedRowIds } = this.state;

    return (
      <>
        <Grid container 
          justify="center"
          className={clsx(classes.root, classes.container)}
        >
          <Grid item xs={12} xl={9}>
            <Typography variant="h5" className={classes.title} style={{marginTop: 40}}>
              Detalle de volumen - {this.state.period.format('MMMM YYYY')}
            </Typography>
            <Paper elevation={0} className={classes.paper}>
              <div className={classes.toolBar}>
                <div className={classes.searchBar}>
                  <form onSubmit={(event) => this.handleSearch(event)}>
                    <div className={classes.searchFieldContainer}>  
                      <DatePicker
                        variant="inline"
                        openTo="year"
                        autoOk={true}
                        views={["year", "month"]}
                        label="Selecciona un periodo:"
                        value={period}
                        minDate={new Date("2010-01-01")}
                        maxDate={moment().endOf('year')}
                        onChange={() => {}}
                        onMonthChange={this.handlePeriodChange}
                        className={classes.searchField}
                        disableFuture
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <Event />
                              </IconButton>
                            </InputAdornment>
                        )
                      }}
                      />
                    </div>
                  </form>
                </div>
                <div>
                  <EmailButton handleClick={() => this.sendMonthlyDetail()} loading={loadingEmail} />
                </div>
              </div>
              { data.length > 0 && (
                <DownlinesTable
                  data={data}
                  columns={[
                    { title: 'Id', field: 'externalId' },
                    { title: 'Nivel', field: 'level' },
                    { title: 'Nombre(s)', field: 'firstName' },
                    { title: 'Apellidos', field: 'lastName' },
                    { title: 'Omein VP', field: 'omeinVp' },
                    { title: 'Omein VG', field: 'omeinGp' },
                    { title: 'Prana VP', field: 'pranaVp' },
                    { title: 'Prana VG', field: 'pranaGp'},
                  ]}
                  filterRowChildren={this.filterRowChildren}
                  expandedRowIds={expandedRowIds}
                  handleActionClick={this.getClickedDownlineData}
                  isLoading={loading}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
        <Snackbar 
          open={openSnackbar} 
          variant={errorEmail ? 'error' : snackbarMessage != '' ? 'success' : 'info'}
          message={snackbarMessage}
          handleClose={this.handleNotificationClose}
          handleExit={this.handleNotificationExit}
        />
      </>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    email: state.get('session').get('email'),
    data: state.get('downlines').get('data'),
    loading: state.get('downlines').get('loading'),
    errorEmail: state.get('downlines').get('errorEmail'),
    loadingEmail: state.get('downlines').get('loadingEmail'),
    openSnackbar: state.get('downlines').get('openSnackbar'),
    snackbarMessage: state.get('downlines').get('snackbarMessage'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getDownlinesData }, dispatch),
    bindActionCreators({ sendMonthlyDetail }, dispatch),
    bindActionCreators({ closeNotification }, dispatch),
    bindActionCreators({ exitNotification }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Downlines)));
