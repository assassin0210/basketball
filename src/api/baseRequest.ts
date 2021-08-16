import axios from "axios";

const token = ()=> localStorage.getItem('token')

export const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer  ${token()}`
    },
});

