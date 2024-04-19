import Axios from 'axios';
import Config from '@/config';

const DataAPI = Axios.create({
  baseURL: `${Config.BASE_URL}/data`,
});

export default DataAPI;

DataAPI.interceptors.request.use((req) => {
  /** @TODO Handle missing id, etc. */
  return req;
});
