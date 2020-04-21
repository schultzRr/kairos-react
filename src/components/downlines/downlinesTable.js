import React, { Component } from 'react';

import { 
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  withStyles 
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

const styles = theme => ({
  root: {
    overflowX: 'auto',
    width: '100%',
  },
  tableContainer: {
    minHeight: 200,
    // maxHeight: 500,
  },
  expanded: {
    transition: 'all 200ms ease 0s',
    transform: 'rotate(90deg)',
  }
});

const StyledTableCell = withStyles((theme) => ({
  body: {
    height: 58,
  },
  stickyHeader: {
    backgroundColor: theme.palette.custom.white,
  }
}))(TableCell);

class DownlinesTable extends Component {
  state = {
    expandedRowIds: this.props.data.find(row => row.parentId == null) ? 
        [this.props.data.find(row => row.parentId == null).id] : []
  }

  getRoot = (rows) => {
    return rows.find(row => row.parentId == null);
  }

  renderTree = (row, rows) => {
    const { classes, columns } = this.props;
    const children = this.props.filterRowChildren(row, rows);

    return(
      <React.Fragment key={row.id}>
        <TableRow>
          <StyledTableCell>
            { row.hasItems ? (
              <IconButton onClick={() => this.handleActionClick(row)} aria-label="toggle downlines">
                <ChevronRight className={ this.isExpandedRow(row.id) ? classes.expanded : '' }/>
              </IconButton>
            ) : (
              null
            )}
          </StyledTableCell>
          {columns && columns.map((column) => (
            <StyledTableCell key={column.field}>{ row[column.field] }</StyledTableCell>
          ))}
        </TableRow>
        {children.length > 0 && this.isExpandedRow(row.id) && (
          children.map((row) => {
            return this.renderTree(row, rows)
          })
        )}
      </React.Fragment>
    )
  }

  handleActionClick = (row) => {
    if(this.isExpandedRow(row.id)) {
      this.setState({
        expandedRowIds: this.state.expandedRowIds.filter((rowId) => { 
          return rowId !== row.id;
        })
      });
    } else {
      if(this.props.filterRowChildren(row, this.props.data).length == 0 ) {
        this.props.onTreeExpandChange(row);
      }
      this.setState({
        expandedRowIds: [...this.state.expandedRowIds, row.id]
      })
    }
  }

  isExpandedRow = (rowId) => {
    return this.state.expandedRowIds.indexOf(rowId) > -1;
  }

  render() {
    const { classes, loading, columns, data } = this.props;

    return (
      <div className={classes.root}>
        <TableContainer className={classes.tableContainer}>
          <Table size="small" stickyHeader aria-label="Downlines table">
            <TableHead>
              <TableRow>
                <StyledTableCell key="action"></StyledTableCell>
                {columns && columns.map((column) => (
                  <StyledTableCell key={column.field}>{ column.title }</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data && (
                this.renderTree(this.getRoot(data), data)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
  
};

export default withStyles(styles)(DownlinesTable);
