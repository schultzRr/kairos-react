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

  getRoot = (rows) => {
    return rows.find(row => row.parentId == null);
  }

  renderTree = (row, rows) => {
    const { classes, columns, isLoading } = this.props;
    const children = this.props.filterRowChildren(row, rows);

    return(
      <React.Fragment key={row.id}>
        <TableRow>
          <StyledTableCell>
            { row.hasItems ? (
              <IconButton onClick={isLoading ? null : () => this.props.handleActionClick(row)} aria-label="toggle downlines">
                <ChevronRight className={ this.isExpandedRow(row.id) ? classes.expanded : '' }/>
              </IconButton>
            ) : (
              null
            )}
          </StyledTableCell>
          { columns?.map((column) => (
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

  isExpandedRow = (rowId) => {
    return this.props.expandedRowIds.indexOf(rowId) > -1;
  }

  render() {
    const { classes, columns, data } = this.props;

    return (
      <div className={classes.root}>
        <TableContainer className={classes.tableContainer}>
          <Table size="small" stickyHeader aria-label="Downlines table">
            <TableHead>
              <TableRow>
                <StyledTableCell key="action"></StyledTableCell>
                { columns?.map((column) => (
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
