/* eslint-disable no-param-reassign */
import axios from 'axios';
import { loadState } from './localStorage';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

apiClient.interceptors.request.use((config) => {
  const token = loadState('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default apiClient;
