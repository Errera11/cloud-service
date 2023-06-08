import {createSlice} from "@reduxjs/toolkit";
import {IInitialState} from "../actions/userAC/types";
import {signIn, signUp} from "../actions/userAC/userAC";

const initialState: IInitialState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(signIn.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload;
            })
        }
    }
)
