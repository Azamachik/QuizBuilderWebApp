import axios from 'axios';
import { USER_TOKEN_KEY } from '@/shared/consts/localStorage';

export const $api = axios.create({
    baseURL: __API__
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = localStorage.getItem(USER_TOKEN_KEY) || '';
    }
    return config;
});
