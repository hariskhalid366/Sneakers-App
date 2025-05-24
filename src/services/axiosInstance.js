import axios from 'axios';
import Config from 'react-native-config';
import {getItem} from '../constants/mmkv';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.124:5003',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
    }

    return Promise.reject(error.response?.data || error.message);
  },
);

export default axiosInstance;
