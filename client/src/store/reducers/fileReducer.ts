import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {IFilesInitialState} from "../actions/fileAC/types";
import {createFile, createDir, setFiles, deleteFile} from "../actions/fileAC/fileAC";

const initialState: IFilesInitialState = {
    files: [],
    currentDir: '',
    error: '',
    loaded: 0,
    isLoading: false
}

export const fileSlice = createSlice(
    {
        initialState,
        name: 'file',
        reducers: {
            setDirectory: (state, action: PayloadAction<string>) => {
                state.currentDir = action.payload
            },
            setLoaded: (state, action: PayloadAction<number>) => {
                state.loaded = action.payload
            },
            setIsLoading: (state, action) => {
                state.isLoading = action.payload
            }
        },
        extraReducers: builder => {
            builder.addCase(setFiles.fulfilled, (state, action) => {
                state.files = action.payload
            })
            builder.addCase(createDir.fulfilled , (state, action) => {
                state.files.push(action.payload)
            })
            builder.addCase( createFile.fulfilled, (state, action) => {
                state.files.push(action.payload)
            })
            builder.addCase( deleteFile.fulfilled, (state, action) => {
                console.log(action);
                state.files = state.files.filter(file => file.id !== action.payload)
            })
            builder.addCase(createDir.rejected || setFiles.rejected || setFiles.rejected, (state, action) => {
                state.error = String(action.error.message);
            })

        }
    }
)

export const {setDirectory, setLoaded, setIsLoading} = fileSlice.actions