import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from 'material-table'

import { 
  Grid,
  Paper,
  Typography,
  withStyles 
} from '@material-ui/core';

import { getSummary } from './downlinesActions';

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
      paddingLeft: theme.spacing(0),
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
  detailButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  detailButton: {
    marginRight: 16,
    textTransform: 'capitalize',
  },
  img: {
    height: 30,
  },
});

class DownlinesTable extends Component {

  componentDidMount() {
    this.props.getSummary();
  }

  render() {
    const { classes } = this.props;
    const summary = this.props.summary ? this.props.summary.toJS() : null;

    return (
      <MaterialTable
        title="Basic Tree Data Preview"
        data={[
          {
            id: 1,
            name: 'a',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 63,
            sex: 'Male',
            type: 'adult',
          },
          {
            id: 2,
            name: 'b',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 34,
            sex: 'Female',
            type: 'adult',
            parentId: 1,
          },
          {
            id: 3,
            name: 'c',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 34,
            sex: 'Female',
            type: 'child',
            parentId: 1,
          },
          {
            id: 4,
            name: 'd',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 34,
            sex: 'Female',
            type: 'child',
            parentId: 3,
          },
          {
            id: 5,
            name: 'e',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 34,
            sex: 'Female',
            type: 'child',
          },
          {
            id: 6,
            name: 'f',
            surname: 'Baran',
            birthYear: 1987,
            birthCity: 34,
            sex: 'Female',
            type: 'child',
            parentId: 5,
          },
        ]}
        columns={[
          { title: 'Adı', field: 'name' },
          { title: 'Soyadı', field: 'surname' },
          { title: 'Cinsiyet', field: 'sex' },
          { title: 'Tipi', field: 'type', removable: false },
          { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
          {
            title: 'Doğum Yeri',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      />
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    summary: state.get('downlines').get('summary'),
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
)(DownlinesTable)));
