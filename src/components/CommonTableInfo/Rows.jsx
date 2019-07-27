import React from 'react';

import { Table } from '@devexpress/dx-react-grid-material-ui';

import './styles.css'

const ClickableRow = ({ row, ...restProps }, callback) => {
  return (
    <Table.Row
      {...restProps}
      style={{ cursor: 'pointer' }}
      className="row"
      onClick={() => callback(row)}
    />
  );
};

export default ClickableRow;