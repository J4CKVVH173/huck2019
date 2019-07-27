import React from 'react';

import TextField from '@material-ui/core/TextField';
import './styles.css';

const ListComments = (props) => {
  const {data} = props;
  const comments = data.map((v, i) => {
    return (<div className="comment" key={i}>
      <TextField
        defaultValue={v.date}
        label="Дата"
        style={{ width: '65%' }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        defaultValue={v.rating}
        style={{ width: '25%', float: 'right' }}
        label="Рейтинг"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        defaultValue={v.comment}
        label="Комментарий"
        variant="outlined"
        multiline
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        style={{ marginBottom: 5, marginTop: 10 }}
      />
    </div>);
  });
  return [...comments];
};

export default ListComments;
