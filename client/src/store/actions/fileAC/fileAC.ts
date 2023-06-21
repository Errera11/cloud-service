import {createAsyncThunk} from "@reduxjs/toolkit";
import {FileActionTypes} from "./types";
import {fileAPI} from "../../../http/file";


export const setFiles = createAsyncThunk(
    FileActionTypes.SET_FILES,
    async (parentId: string) => {
        try {
            const response = await fileAPI.getFiles(parentId)
            return response.data
        } catch (e) {
            throw e
        }

    }
)

export const createDir = createAsyncThunk(
    FileActionTypes.CREATE_DIR,
    async({fileName, parent, type}: {fileName: string, parent: string | null, type: string | null}) => {
        try {
            const response = await fileAPI.createDir(fileName, parent, type)
            return response.data
        } catch (e) {
            throw e
        }
    }
)

export const createFile = createAsyncThunk(
    FileActionTypes.CREATE_FILE,
    async (form: FormData) => {
        try {
            const response = await fileAPI.createFile(form)
            return response.data
        } catch(e) {
            throw e
        }
    }
)
