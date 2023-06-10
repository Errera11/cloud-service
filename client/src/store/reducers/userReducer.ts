import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IInitialState, IUser} from "../actions/userAC/types";
import {signIn, signUp} from "../actions/userAC/userAC";

const initialState: IInitialState = {
    error: '',
    user: null,
    isAuth: false
}

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            error: (state, action) => {
                state.error = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(signIn.fulfilled || signUp.fulfilled, (state, action) => {
                state.error = '';
                state.user = (action.payload as unknown) as IUser;
                state.isAuth = true;
            })
            builder.addCase(signIn.rejected || signUp.rejected, (state, action) => {
                state.error = String(action.error.message);
            })
        }
    }
)

export const {error} = userSlice.actions