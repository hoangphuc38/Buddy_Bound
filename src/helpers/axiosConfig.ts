import axios, { AxiosError, AxiosInstance } from 'axios';
import { getData, removeData } from './asyncStorage';
import { ToastOptions, toast } from '@baronha/ting';

export const BASE_ENDPOINT = 'https://buddybound-app-790723374073.asia-southeast1.run.app/api/v1';

interface Error {
  error: string
}

class Http {
  private accessToken: string;
  public instance: AxiosInstance;

  constructor() {
    this.accessToken = '';
    this.instance = axios.create({
      baseURL: BASE_ENDPOINT,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  public setAccessToken(token: string) {
    const cleanedToken = token.replace(/\.\./g, '');
    this.accessToken = cleanedToken;
    this.instance.defaults.headers.common.Authorization = cleanedToken;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const response = error.response;

        if (response?.status === 401) {
          // Clear token on 401
          await removeData({ item: 'token' });
          this.setAccessToken('');

          const errorMsg = response.data as Error;
          const options: ToastOptions = {
            title: 'Session Expired',
            message: errorMsg.error || 'Please log in again',
            preset: 'error',
            backgroundColor: '#e2e8f0',
          };
          toast(options);

          // You might want to trigger a navigation to login here
        } else if (response?.status === 400) {
          const options: ToastOptions = {
            title: 'Error',
            message: Array.isArray(response.data) ? response.data[0] : response.data.message,
            preset: 'error',
            backgroundColor: '#e2e8f0',
          };
          toast(options);
        } else {
          console.error('API Error:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }
}

// Create a single instance
const http = new Http();

// Export both the instance and the class for token updates
export default http.instance;
export const httpClient = http;
