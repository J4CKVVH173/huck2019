import axios from 'axios';

const xsrfCookieName = 'csrftoken';
const xsrfHeaderName = 'X-CSRFToken';

const timeout = 100000;

let baseURL = 'http://localhost:8000';

const headers = {
  'Content-Type': 'application/json',
};

const axiosConfig = {
  baseURL,
  xsrfCookieName,
  xsrfHeaderName,
  timeout,
  headers,
};

const session = axios.create(axiosConfig);

export default session;
