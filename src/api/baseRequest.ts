import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control':'Allow-Origin',


    },
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
