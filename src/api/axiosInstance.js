import axios from 'axios';
import {API_BASE} from '@env';
import {useAuthStore} from '../stores/auth.store';
import * as NavigationService from '../navigation/NavigationService';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: tự thêm token từ MMKV
axiosInstance.interceptors.request.use(
  config => {
    try {
      const token = useAuthStore.getState().token;

      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.warn('Error adding token to request', err);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error?.response?.status;

    if (status === 401) {
      console.log('401 → auto logout');

      useAuthStore.getState().clearAuth();

      NavigationService.reset('NoBottomTab', {
        screen: 'ConnectWallet',
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
