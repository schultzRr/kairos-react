import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';

const ROOT_ID = '';

const getRowId = row => row.id;
const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : ROOT_ID));
  if (childRows.length) {
    return childRows;
  }
  return row && row.hasItems ? [] : null;
};

const getDownlineObject = (parentId, user, summary, level) => {
  const result = {
    id: user.id,
    externalId: user.external_id,
    firstName: user.first_name,
    lastName: user.last_name,
    omeinVp: summary.omein_vp,
    omeinVg: summary.omein_vg,
    pranaVp: summary.prana_vp,
    pranaVg: summary.prana_vg,
    parentId: parentId,
    hasItems: user.downline_count && user.downline_count > 0 ? true : false,
    level: level,
  }
  return result
}

let hasRoot = false;
const convertToDownlinesArray = (data, level) => {
  const result = [];
  if (!hasRoot){
    result.push(getDownlineObject("", data.user, data.summary, 0));
    hasRoot = true;
  }
  data.downlines.map(downline => {
    result.push(getDownlineObject(data.user.id, downline.user, downline.summary, level));
  })
  return result;
}

export default (props) => {
  const [columns] = useState([
    { name: 'level', title: 'Nivel' },
    { name: 'externalId', title: 'Id' },
    { name: 'firstName', title: 'Nombre(s)' },
    { name: 'lastName', title: 'Apellidos' },
    { name: 'omeinVp', title: 'Omein VP' },
    { name: 'omeinVg', title: 'Omein VG' },
    { name: 'pranaVp', title: 'Prana VP' },
    { name: 'pranaVg', title: 'Prana VG' },
  ]);
  const [data, setData] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: 'externalId', width: 100, align: 'right' },
    { columnName: 'level', width: 140, align: 'right' },
  ]);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds]
      .filter(rowId => data.findIndex(row => row.parentId === rowId) === -1);
    if (rowIdsWithNotLoadedChilds.length) {
      if (loading) return;
      setLoading(true);
      Promise.all(rowIdsWithNotLoadedChilds
        .map(rowId => {
          const row = data.find(row => row.id == rowId);
          return axios.get('/summaries/by_period_and_user_with_downlines_1_level', {
            params : {
              period_start: moment().startOf('month').format(),
              period_end: moment().add(1, 'month').startOf('month').format(),
              user_id: rowId != ROOT_ID ? rowId : props.rootId,
            }
          })
          .then(response => {
            return convertToDownlinesArray(response.data, row ? row.level + 1 : 1)
          })
        }))
        .then((loadedData) => {
          setData(data.concat(...loadedData));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!loading) {
      loadData();
    }
  });

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid
        rows={data}
        columns={columns}
        getRowId={getRowId}
      >
        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <CustomTreeData
          getChildRows={getChildRows}
        />
        <VirtualTable
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableTreeColumn
          for="level"
          indentComponent="div"
        />
      </Grid>
    </Paper>
  );
};