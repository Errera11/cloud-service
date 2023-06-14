import {createAsyncThunk} from "@reduxjs/toolkit";
import {userActionTypes} from "./types";
import Auth from "../../../http/auth";;

export const signIn
    = createAsyncThunk(userActionTypes.SET_USER,
    async ({email, password}: {email: string, password: string}, thunkAPI) => {
        return Auth.signIn({email, password})
            .then(res => {
                const {token, user} = res.data
                localStorage.setItem('token', `Bearer ${token}`)
                return user
            })
            .catch(error => {
                throw error.response.data.message
            });

    })

export const signUp
    = createAsyncThunk(userActionTypes.SET_USER,
    async ({email, password}: {email: string, password: string}, thunkAPI) => {
        return Auth.signUp({email, password})
            .then((res) => {
                const {user, token} = res.data;
                localStorage.setItem('token', `Bearer ${token}`)
                return user
            })
            .catch((error) => {
                throw error.response.data.message
            });
    })


export const auth = createAsyncThunk(userActionTypes.SET_USER,
    async() => {
    return Auth.tokenAuth()
        .then(response => {
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            return response.data.user
        })
        .catch(error => {
            throw error.response.data.message
        })
    })
