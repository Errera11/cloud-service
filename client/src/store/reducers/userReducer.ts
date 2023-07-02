import {createSlice} from "@reduxjs/toolkit";
import {IInitialState, IUser} from "../actions/userAC/types";
import {auth, deleteImage, signIn, signUp, uploadImage} from "../actions/userAC/userAC";

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
            logOut: state => {
                localStorage.removeItem('token')
                state.user = null
                state.isAuth = false
            }
        },
        extraReducers: builder => {
            builder.addCase(signIn.fulfilled || signUp.fulfilled || auth.fulfilled, (state, action) => {
                state.error = '';
                state.user = (action.payload as unknown) as IUser;
                state.isAuth = true;
            })
            builder.addCase(signIn.rejected || signUp.rejected || auth.rejected, (state, action) => {
                localStorage.removeItem('token')
                state.error = String(action.error.message);
            })
            builder.addCase(uploadImage.fulfilled, (state, action) => {
                state.user!.image = action.payload
            })
            builder.addCase(deleteImage.fulfilled, (state, action) => {
                state.user = action.payload
            })
        }
    }
)

