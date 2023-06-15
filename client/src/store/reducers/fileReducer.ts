import {createSlice, current} from "@reduxjs/toolkit";
import {IFilesInitialState} from "../actions/fileAC/types";
import {setFiles} from "../actions/fileAC/fileAC";

const initialState: IFilesInitialState = {
    files: [],
    currentDir: ''
}

export const fileSlice = createSlice(
    {
        initialState,
        name: 'file',
        reducers: {},
        extraReducers: builder => {
            builder.addCase(setFiles.fulfilled, (state, payload) => {
                state.files = payload.payload
            })
            builder.addCase(setFiles.rejected, (state, payload) => {
                console.log(payload.error);
                //state.files = payload.files
            })
        }
    }
)