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

export const createFile = createAsyncThunk(
    FileActionTypes.CREATE_FILE,
    async({fileName, parentId, type}: {fileName: string, parentId: string | null, type: string | null}) => {
        try {
            const response = await fileAPI.createFile(fileName, parentId, type)
            return response.data
        } catch (e) {
            throw e
        }
    }
)