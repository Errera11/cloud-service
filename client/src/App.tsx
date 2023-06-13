import React, {useEffect} from 'react';
import './App.module.scss';
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/appRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {useAppDispatch} from "./hooks/useAppDispatch";
import {auth} from "./store/actions/userAC/userAC";


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(auth())
            .unwrap()
            .then(r => console.log(r))
            .catch(e => console.log(e))
    }, [])
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <div className={'.body'}>
                    <AppRouter/>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
