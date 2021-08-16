import axios from "axios";
import {token} from "../utils/utils";

export const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer  ${token()}`
    },
});

