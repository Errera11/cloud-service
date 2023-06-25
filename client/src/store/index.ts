import {userSlice} from "./reducers/userReducer";
import {configureStore} from "@reduxjs/toolkit";
import {fileSlice} from "./reducers/fileReducer";
import {appReducer} from "./reducers/appReducer";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        file: fileSlice.reducer,
        app: appReducer.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch