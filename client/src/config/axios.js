import axios from 'axios';
import { BASE_API_URL } from '../constants/Constants';

export default axios.create({
  baseURL: BASE_API_URL,
});
