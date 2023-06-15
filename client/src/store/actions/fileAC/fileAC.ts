import {createAsyncThunk} from "@reduxjs/toolkit";
import {FileActionTypes} from "./types";
import {fileAPI} from "../../../http/file";


export const setFiles = createAsyncThunk(
    FileActionTypes.SET_FILES,
    async () => {
        try {
            const response = await fileAPI.getFiles()
            return response.data
        } catch (e) {
            throw e
        }

    }
)