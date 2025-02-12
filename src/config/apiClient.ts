import axios from 'axios';
import {getBaseURL} from './apiURL';

const API_INSTANCE: any = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export default API_INSTANCE;
