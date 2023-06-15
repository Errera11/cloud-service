import {userSlice} from "./reducers/userReducer";
import {configureStore} from "@reduxjs/toolkit";
import {fileSlice} from "./reducers/fileReducer";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        file: fileSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch