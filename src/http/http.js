import axios from 'axios';
import { getToken } from 'src/services/cookieService';

export const apiClient = axios.create({
  baseURL: `http://localhost:8080/api`,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken('userDataInfo');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));
