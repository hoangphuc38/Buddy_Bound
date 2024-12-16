import axios, { AxiosError, AxiosInstance } from 'axios';
import { getData, storeData } from './asyncStorage';
import { ToastOptions, toast } from '@baronha/ting';

export const BASE_ENDPOINT = 'https://buddybound-app-790723374073.asia-southeast1.run.app/api/v1';
const URL_LOGIN = '/auth/login';

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

        (async () => {
            try {
                this.accessToken = await getData({ item: 'token' }) as string;
                this.instance.defaults.headers.common.Authorization = this.accessToken;
            } catch (error) {
                console.log(error);
            }

            this.instance.interceptors.request.use(
                (config) => {
                    if (this.accessToken && config.headers) {
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
                    const { url } = response.config;
                    console.log("url: ", url);
                    if (url === URL_LOGIN) {
                        const { data } = response.data;
                        console.log("response: ", response);
                        const { accessToken, user } = data;
                        this.accessToken = 'Bearer ' + accessToken;
                        this.instance.defaults.headers.common.Authorization = this.accessToken;
                        storeData({ value: user, item: 'user' });
                        storeData({ value: this.accessToken, item: 'token' });
                    }
                    return response;
                },
                (error: AxiosError) => {
                    const response = error.response;
                    const options: ToastOptions = {
                        title: 'Error',
                        message: response?.data[0],
                        preset: 'error',
                        backgroundColor: '#e2e8f0',
                    };
                    toast(options);
                }
            );
        })();
    }
}

const http = new Http().instance;

export default http;
