import React from 'react';

import { Table } from '@devexpress/dx-react-grid-material-ui';

export const TableCell = props => {
  const { column } = props;
  const statusMap = ['Нет нарушений', 'Незначительные нарушения', 'Серьезные нарушения'];
  const statusColors = ['#1c9841', '#ffd04c', '#ff3321'];

  switch (column.name) {
    case 'status':
      return (
        <Table.Cell
          {...props}
          style={{ background: `${statusColors[props.value - 1]}`}}
        >
          <div>{statusMap[props.value - 1]}</div>
        </Table.Cell>
      );
    default:
      return (
        <Table.Cell
          {...props}
        >
          <div>{props.value}</div>
        </Table.Cell>
      );
  }
};
