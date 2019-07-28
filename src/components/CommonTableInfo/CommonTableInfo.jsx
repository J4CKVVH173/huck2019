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
import {TableCell} from './Cells';
import jsonResponse from './data';
import './styles.css';

import vkLink from '../icons/vk.png';
import vkDisable from '../icons/vkDisable.png';
import www from '../icons/www.png';
import instagram from '../icons/instagram.png';
import instagramDisable from '../icons/instagramDisable.png';

import { tableMessages, filterRowMessages, tableHeaderRowMessage } from '../../lib/translate';

class CommonTableInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {name: 'company_name', title: 'Наименование'},
        {name: 'address', title: 'Адрес'},
        {name: 'status', title: 'Статус'},
      ],
      rows: [],
      pageSizes: [5, 10, 15, 25],
      lat: 55.78,
      lng: 37.76,
      zoom: 14,
      show: false,
      marks: null,
      statusText: '',
      statusInfo: '',
      okved: '',
      okpo: '',
      opf: '',
      site: '',
      inst: '',
      inn: '',
      vk: '',
      name: '',
      address: '',
      comments: [],
      isOpen: false,
      loading: true,
      status: 1,
    };
  }

  componentDidMount() {
    // ToDo реализовать загрузку с бэка путем раскоментирования и указания верного урла. axios настроен
    // getContent('test').then(
    //   response => response.data).then( data => {
    //     console.log(data);
    //     const rows = data;
    //     const marks = this.generateMarks(data);
    //     this.setState({ rows, marks, loading: false })
    //   }
    // ).catch(
    //   e => console.log(e)
    // )
    const rows = jsonResponse;
    const marks = this.generateMarks(jsonResponse);
    this.setState({ rows, marks, loading: false })
  }

  generateMarks = (data) => {
    const marks = data.map((v, i) => {
      const position = [v.lat || 0, v.long || 0];
      if (i === 100) console.log(position);
      let status = 'no-data';
      if (v.status === 1) status = 'good';
      if (v.status === 2) status = 'so-so';
      if (v.status === 3) status = 'bad';
      return (
        <Overlay anchor={position} key={v.id}>
          <div className={`mark ${status}`} onClick={() => this.openModalWithData(v)} />
        </Overlay>
      )
    });
    return marks;
  };

  closeModal = () => this.setState({ isOpen: false });

  openModalWithData = data => {
    const {
      status_text,
      status,
      company_name,
      address,
      okved,
      okpo,
      inn,
      opf,
      website,
      instagram,
      vk,
      comment,
      rating,
      date,
    } = data;
    const zipComments = [];
    if (comment !== undefined) {
      for (let i = 0; i < comment.length; i++) {
        zipComments.push({
          comment: comment[i],
          rating: rating[i],
          date: date[i],
        })
      }
    }
    const statusMap = ['Нет нарушений', 'Незначительные нарушения', 'Серьезные нарушения'];
    this.setState(state => ({
      statusText: statusMap[status - 1] || '',
      statusInfo: status_text || '',
      status: status || 1,
      name: company_name || '',
      address: address || '',
      okved: okved || '',
      inn: inn || '',
      okpo: okpo || '',
      opf: opf || '',
      site: website || '',
      inst: instagram || '',
      vk: vk || '',
      comments: zipComments,
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
      inn,
      site,
      inst,
      vk,
      comments,
      status,
      isOpen,
      loading,
    } = this.state;

    const statusColors = ['#1c9841', '#ffd04c', '#ff3321'];

    const position = [this.state.lat, this.state.lng];
    return (
      <div className="wrapper">
        <Map defaultCenter={position} defaultZoom={zoom} height={400}>
          {marks}
        </Map>
        {loading && <LinearProgress />}
        <Paper className={loading ? 'blur' : ''}>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SortingState/>
            <IntegratedSorting/>
            <FilteringState defaultFilters={[]}/>
            <IntegratedFiltering/>
            <VirtualTable
              cellComponent={TableCell}
              messages={tableMessages}
              rowComponent={rowData => ClickableRow(rowData, this.openModalWithData)}
            />
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
              style={{ background: `${statusColors[status - 1]}` }}
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
              defaultValue={inn}
              label="ИНН"
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
              <Link href={site || '#'} className={site ? '' : 'disable-link'}>
                <img src={www} alt="vk" className="icon"/>
              </Link>

              <Link href={inst || '#'} className={inst ? '' : 'disable-link'} >
                <img src={inst ? instagram : instagramDisable} alt="inst" className="icon"/>
              </Link>
              <Link href={vk || '#'} className={vk ? '' : 'disable-link'} >
                <img src={vk ? vkLink : vkDisable} alt="vk" className="icon"/>
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
