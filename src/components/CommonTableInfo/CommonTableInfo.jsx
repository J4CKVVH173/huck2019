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
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';

import Overlay from 'pigeon-overlay';
import Map from 'pigeon-maps';

import ListComments from '../ListComments/ListComments';
import ClickableRow from './Rows';
import { getContent } from '../../lib/api';
import './styles.css';

import { tableMessages, filterRowMessages, tableHeaderRowMessage } from '../../lib/translate';

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
        // {name: 'kek', address: 'cheburek', status: 'ololo', statusText: 'I', statusInfo: 'am', okved: 'a', okpo: 'live'},
        // {name: 'kek', address: 'cheburek', status: 'ololo', statusText: 'I', statusInfo: 'am', okved: 'a', okpo: 'live'},
        // {name: 'kek', address: 'cheburek', status: 'ololo', statusText: 'I', statusInfo: 'am', okved: 'a', okpo: 'live'},
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
      comments: [],
      isOpen: false,
      loading: true,
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
      return (
        <Overlay anchor={position}>
          <div className={`mark ${status}`} onClick={() => this.openModalWithData(v)} />
        </Overlay>
      )
    });
    return marks;
  };

  componentDidMount() {
    getContent('test').then(
      data => {
        const rows = data;
        const marks = this.generateMarks(data);
        this.setState({ rows, marks, loading: false })
      }
    )
  }

  closeModal = () => this.setState({ isOpen: false });

  openModalWithData = data => {
    const {
      statusText,
      statusInfo,
      name,
      address,
      okved,
      okpo,
      opf,
      site,
      inst,
      vk,
      comments,
    } = data;
    this.setState(state => ({
      statusText: statusText || '',
      statusInfo: statusInfo || '',
      name: name || '',
      address: address || '',
      okved: okved || '',
      okpo: okpo || '',
      opf: opf || '',
      site: site || '',
      inst: inst || '',
      vk: vk || '',
      comments: comments || [],
      isOpen: true,
    }))
  };

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
      okved,
      okpo,
      opf,
      site,
      inst,
      vk,
      comments,
      isOpen,
      loading,
    } = this.state;
    const t = {
      name: 'name',
      address: 'address',
      okved: 'okved',
      okpo: 'okpo',
      opf: 'opf',
      site: 'https://google.com',
      inst: 'inst',
      vk: 'vk',
      statusText: 'Статус текст',
      statusInfo: 'asdasdasdasdasd asdasdasdasd asdasdasdasda asdasdasda asdasdadsa asdasdasdad asdasd',
      comments: [
        {date: '123', rating: '5', comment: 'a lot of shit about some placeфщоыфзщвоа флыовлфыв фыаоы фывывфыв  фывф'},
        {date: '123', rating: '5', comment: 'a lot of shit about some place'},
        {date: '123', rating: '5', comment: 'a lot of shit about some place'},
        {date: '123', rating: '5', comment: 'a lot of shit about some place'},
        {date: '123', rating: '5', comment: 'a lot of shit about some place'},
      ]
    };
    const position = [this.state.lat, this.state.lng];
    const status = 'no-data';
    return (
      <div className="wrapper">
        <Map defaultCenter={position} defaultZoom={zoom} height={400}>
          <Overlay anchor={position} >
            <div className={`mark ${status}`} onClick={() => this.openModalWithData(t)}/>
          </Overlay>
          {marks}
        </Map>
        {loading && <LinearProgress />}
        <Paper className="blur">
          <Grid
            rows={rows}
            columns={columns}

          >
            <SortingState/>
            <IntegratedSorting/>
            <FilteringState defaultFilters={[]}/>
            <IntegratedFiltering/>
            <VirtualTable messages={tableMessages} rowComponent={rowData => ClickableRow(rowData, this.openModalWithData)} />
            <TableHeaderRow messages={tableHeaderRowMessage} showSortingControls/>
            <TableFilterRow messages={filterRowMessages} />
          </Grid>
        </Paper>
        <Modal open={isOpen} onClose={this.closeModal}>
          <div className="modal-info">
            <h3>Информация о компании</h3>
            <TextField
              className="text-field"
              defaultValue={statusText}
              label="Статус"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={statusInfo}
              label="Статусная информация"
              multiline
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={name}
              label="Наименование"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={address}
              label="Адрес"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={okved}
              label="ОКВЕД"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={okpo}
              label="ОКПО"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              className="text-field"
              defaultValue={opf}
              label="ОПФ"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <div className="link-wrapper">
              <Link href={site} >
                Переход на сайт
              </Link>
              <Link href={inst} >
                Инстаграм
              </Link>
              <Link href={vk} >
                Вконтакте
              </Link>
            </div>
            <h3 style={{ textAlign: 'left' }}>Отзывы:</h3>
            <div className="comments">
              <ListComments data={comments}/>
            </div>
            <div className="buttons">
              <Button variant="contained" color="primary" onClick={this.closeModal}>
                Закрыть
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CommonTableInfo;