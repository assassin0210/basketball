import axios from "axios";




export const token = localStorage.getItem('token')
export const name = localStorage.getItem('name')
export const avatarUrl = localStorage.getItem('avatarUrl') as string

export const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});


