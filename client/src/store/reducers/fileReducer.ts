import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitialState} from "../actions/fileAC/types";
import {createFile, setFiles} from "../actions/fileAC/fileAC";

const initialState: IFilesInitialState = {
    files: [],
    currentDir: ''
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
            builder.addCase(setFiles.rejected, (state, payload) => {
                console.log(payload.error);
                //state.files = payload.files
            })
            builder.addCase(createFile.fulfilled, (state, payload) => {
                state.files.push(payload.payload)
            })
        }
    }
)

export const {setDirectory} = fileSlice.actions