import axios from "axios";


const instance = axios.create({
    baseURL: 'http://dev.trainee.dex-it.ru',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

export type signUpDataType = {
    userName: string
    login: string
    password: string
}
type signInDataType = {
    login: string
    password: string
}


type authApiType = {
    singUp: (data: signUpDataType) => any
    singIn: (data: signInDataType) => any

}
export const authApi: authApiType = {

     singUp(data) {
        debugger
        const promise =  instance.post('/api/Auth/SignUp', {
            "userName": data.userName,
            "login": data.login,
            "password": data.password
        })
        return promise
    },
    async singIn(data) {
        const promise = await instance.post("/api/Auth/SignIn", {
            "login": data.login,
            "password": data.password
        })
        localStorage.setItem('token', promise.data.token)
        instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return promise
    }
}
