import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    userDiskLoading: false
}

export const appReducer = createSlice(
    {
        name: "app",
        initialState: initialState,
        reducers: {
            setUserDiskLoading: (state, action: PayloadAction<boolean>) => {
                state.userDiskLoading = action.payload
            }
        }
    }
)