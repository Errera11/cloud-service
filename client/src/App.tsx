import React from 'react';
import './App.module.scss';
import Navbar from "./components/navbar/Navbar";
import AppRouter from "./components/appRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
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
