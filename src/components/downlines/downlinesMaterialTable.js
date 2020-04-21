import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';

import { 
  Paper,
  Fab,
  Button,
  withStyles 
} from '@material-ui/core';
import MaterialTable from 'material-table'
import {
  SearchOutlined as SearchIcon,
  MailOutline as MailIcon,
  }  from '@material-ui/icons';

import { getDownlinesData, showDownlinesTableLoader } from './downlinesActions';

const styles = theme => ({
  root: {
    height: 'auto',
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
    width: 150,
  },
  searchButton: {
    height: 35,
    minHeigth: 35,
    minWidth: 35,
    width: 35,
    boxShadow: theme.shadows[0],
    '&:active': {
      boxShadow: theme.shadows[0],
    },
  },
});

class DownlinesTable extends Component {

  state = {
    period: moment(),
  };

  handlePeriodChange = date => {
    this.setState({ period: date });
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.loadData(this.props.id, 0);
  }

  getMonthDetail = (month) => {
    const period = this.state.period.clone();
    this.props.getMonthDetail(
      period.startOf('month').format(),
      period.add(1, 'month').startOf('month').format(),
      this.props.email,
    );
  }

  loadData = (id, level) => {
    const period = this.state.period.clone();
    this.props.getDownlinesData(
      id,
      period.startOf('month').format(),
      period.add(1, 'month').startOf('month').format(),
      level,
    );
  }

  getClickedDownlineData = (row) => {
    if (row.tableData.childRows && row.tableData.childRows[0].id == null) {
      this.props.showDownlinesTableLoader();

      this.loadData(row.id, row.level);
    }
  }

  componentDidMount() {
    this.loadData(this.props.id, 0);
  }

  render() {
    const { classes, loading } = this.props;
    const data = this.props.data ? this.props.data.toJS() : null;

    const { period } = this.state;

    return (
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
                  onChange={this.handlePeriodChange}
                  className={classes.searchField}
                  disableFuture
                />
                <Fab 
                  type="submit"
                  size="small" 
                  color="primary" 
                  aria-label="Search" 
                  className={classes.searchButton}
                >
                  <SearchIcon />
                </Fab>
              </div>
            </form>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              startIcon={<MailIcon />}
              disableElevation
              onClick={() => this.getMonthDetail()}
            >
              Enviar por correo
            </Button>
          </div>
        </div>
        { data && (
          <MaterialTable
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
            parentChildData={(row, rows) => rows.find(a => a.externalId === row.parentId)}
            onTreeExpandChange={(row) => this.getClickedDownlineData(row)}
            isLoading={loading}
            options={{
              toolbar: false,
            }}
          />
        )}
      </Paper>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    id: state.get('session').get('id'),
    email: state.get('session').get('email'),
    data: state.get('downlines').get('data'),
    loading: state.get('downlines').get('loading'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getDownlinesData }, dispatch),
    bindActionCreators({ showDownlinesTableLoader }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(DownlinesTable)));
