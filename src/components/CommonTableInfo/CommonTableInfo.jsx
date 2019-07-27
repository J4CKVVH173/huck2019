import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Overlay from 'pigeon-overlay';
import Map from 'pigeon-maps';

import './styles.css';

class CommonTableInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {name: 'name', title: 'Наименование'},
        {name: 'address', title: 'Адрес'},
        {name: 'status', title: 'Статус'},
      ],
      rows: [
        {name: 'kek', address: 'cheburek', status: 'ololo'},
        {name: 'kek', address: 'cheburek', status: 'ololo'},
        {name: 'kek', address: 'cheburek', status: 'ololo'},
        {name: 'kek', address: 'cheb5urek', status: 'ololo'},
        {name: 'kek', address: 'chebu5rek', status: 'ololo'},
        {name: 'k4ek', address: 'cheburek', status: 'olo4lo'},
        {name: 'kek3', address: 'cheburek3', status: 'o3lolo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'ololo'},
        {name: 'kek2', address: 'cheburek', status: 'lololo'},
        {name: 'kek2', address: 'cheburek', status: 'Тест'},
      ],
      pageSizes: [5, 10, 15, 25],
      lat: 55.75,
      lng: 37.61,
      zoom: 11,
      show: false,
      marks: null,
      statusText: '',
      statusInfo: '',
      okved: '',
      okpo: '',
      opf: '',
      site: '',
      inst: '',
      vk: '',
      name: '',
      address: '',
      isOpen: false,
    };
  }
  // <Overlay anchor={position}>
  //     <div className="good"/>
  //   </Overlay>;
  generateMarks = (data) => {
    const marks = data.map(v => {
      const position = [v.lat, v.lng];
      let status = 'no-data';
      if (v.status === 'good') status = 'good';
      if (v.status === 'bad') status = 'bad';
      const data = {

      };
      return (
        <Overlay anchor={position}>
          <div className={`mark ${status}`}/>
        </Overlay>
      )
    });
    return marks;
  };

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const {
      columns,
      rows,
      zoom,
      marks,
      statusText,
      statusInfo,
      name,
      address,
      isOpen,
    } = this.state;
    const t = {
      name: 'name', address: 'address',
      okved: 'okved', okpo: 'okpo', opf: 'opf', site: 'site', inst: 'inst', vk: 'vk', statusText: 'Статус текст'
    };
    const position = [this.state.lat, this.state.lng];
    const status = 'no-data';
    return (
      <div className="wrapper">
        <Map defaultCenter={position} defaultZoom={zoom} height={400}>
          <Overlay anchor={position} >
            <div className={`mark ${status}`} onClick={() => this.setState({ ...t, isOpen: true})}/>
          </Overlay>
          {marks}
        </Map>
        <Paper>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SortingState/>
            <IntegratedSorting/>
            <FilteringState defaultFilters={[]}/>
            <IntegratedFiltering/>
            <VirtualTable/>
            <TableHeaderRow showSortingControls/>
            <TableFilterRow/>
          </Grid>
        </Paper>
        <Modal open={isOpen}>
          <Paper className="modal-info">
            <h3>Информация о компании</h3>
            <TextField
              defaultValue={statusText}
              label="Статус"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <p>
              Адресс: {address};
            </p>
            <div className="buttons">
              <Button variant="contained" color="primary" onClick={this.closeModal}>
                Закрыть
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default CommonTableInfo;