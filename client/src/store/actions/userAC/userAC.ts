import {createAsyncThunk} from "@reduxjs/toolkit";
import {userActionTypes} from "./types";
import Auth from "../../../http/auth";

export const signIn
    = createAsyncThunk(userActionTypes.SET_USER,
    async ({email, password}: {email: string, password: string}, thunkAPI) => {
        const {data} = await Auth.signIn({email, password});
        return data;
    })

export const signUp
    = createAsyncThunk(userActionTypes.SET_USER,
    async ({email, password}: {email: string, password: string}, thunkAPI) => {
        const {data} = await Auth.signUp({email, password});
        return data;
    })

