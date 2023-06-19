import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitialState} from "../actions/fileAC/types";
import {createFile, createDir, setFiles} from "../actions/fileAC/fileAC";
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
                state.currentDir = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(setFiles.fulfilled, (state, payload) => {
                state.files = payload.payload
            })
            builder.addCase(createDir.fulfilled , (state, payload) => {
                console.log(payload);
                state.files.push(payload.payload)
            })
            builder.addCase( createFile.fulfilled, (state, payload) => {
                console.log(payload);
                state.files.push(payload.payload)
            })
            builder.addCase(createDir.rejected || setFiles.rejected || setFiles.rejected, (state, action) => {
                console.log(action);
                state.error = String(action.error.message);
            })
        }
    }
)

export const {setDirectory} = fileSlice.actions