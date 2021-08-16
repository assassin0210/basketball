import React, {useEffect} from 'react';
import './index.scss'
import {Routes} from './pages/routes';
import {useDispatch} from "react-redux";
import { setToken } from './modules/autorization/authSlice';


export const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setToken(localStorage.getItem('token')))
    },[])

    return (
        <div className="App">
            <Routes/>
        </div>
    );
}


