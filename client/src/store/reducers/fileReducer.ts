import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitialState} from "../actions/fileAC/types";
import {createFile, setFiles} from "../actions/fileAC/fileAC";
import {auth, signIn, signUp} from "../actions/userAC/userAC";

const initialState: IFilesInitialState = {
    files: [],
    currentDir: '',
    error: ''
}

export const fileSlice = createSlice(
    {
        initialState,
        name: 'file',
        reducers: {
            setDirectory: (state, action: PayloadAction<string>) => {
                console.log(action.payload);
                state.currentDir = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(setFiles.fulfilled, (state, payload) => {
                state.files = payload.payload
            })
            builder.addCase(setFiles.rejected, (state, payload) => {
                console.log(payload.error);
                //state.files = payload.files
            })
            builder.addCase(createFile.fulfilled, (state, payload) => {
                state.files.push(payload.payload)
            })
            builder.addCase(createFile.rejected || setFiles.rejected, (state, action) => {
                localStorage.removeItem('token')
                state.error = String(action.error.message);
            })
        }
    }
)

export const {setDirectory} = fileSlice.actions