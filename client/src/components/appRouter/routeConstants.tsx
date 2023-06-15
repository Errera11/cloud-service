import SignIn from "../auth/SignIn";
import React from "react";
import SignUp from "../auth/SignUp";
import Home from "../../pages/home/Home";
import {Navigate} from "react-router-dom";
import UserDisk from "../../pages/userDisk/UserDisk";

export enum routes {
    SIGN_IN = '/signIn',
    SIGN_UP = '/signUp',
    HOME = '/',
}

export const publicRoutes = [
    {path: routes.SIGN_IN, element: <SignIn />},
    {path: routes.SIGN_UP, element: <SignUp />},
    {path: '/*', element: <Navigate to={routes.SIGN_UP}/>},
]

export const privateRoutes = [
    {path: routes.HOME, element: <UserDisk />},
    {path: '/*', element: <Navigate to={routes.HOME}/>},
]