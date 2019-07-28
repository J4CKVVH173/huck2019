import React from 'react';

import { Table } from '@devexpress/dx-react-grid-material-ui';
import './styles.css';

export const TableCell = props => {
  const { column } = props;
  const statusMap = ['Нет нарушений', 'Незначительные нарушения', 'Серьезные нарушения'];
  const statusColors = ['#1c9841', '#ffaa21', '#ff3321'];

  switch (column.name) {
    case 'status':
      return (
        <Table.Cell
          {...props}

        >
          <div>
            <div className="status" style={{ background: `${statusColors[props.value - 1]}`}}>
            </div>
            <span style={{ marginBottom: 10}}>{statusMap[props.value - 1]}</span></div>
          {/*<Chip label={statusMap[props.value - 1]} style={{ color: `${statusColors[props.value - 1]}`}} />*/}
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
