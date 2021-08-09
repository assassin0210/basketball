import axios from "axios";


const tokenKey = 'currentUser';

export const authOn = () => {

    localStorage.setItem(tokenKey, 'TestLogin');
}

export const authOf = () => {
    localStorage.removeItem(tokenKey);
}

export const isAuth = () => {
    if (localStorage.getItem('currentUser')) {
        return true;
    }

    return false;
}

export const examinationAuth =(status:boolean|undefined| null)=>{
    if(!status){
        return true
    }
    return false
}

export const currentUser = JSON.parse(localStorage.getItem('currentUser') as any)

export const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});


