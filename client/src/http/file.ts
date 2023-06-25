import axios, {AxiosRequestConfig} from "axios";
import {IFile} from "../store/actions/fileAC/types";
import {setLoaded} from "../store/reducers/fileReducer";


const file = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

file.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem('token')
    return config
})

const getFiles = (parent: string, sort: string, search?: string) => file.get<IFile[]>('file', {params: {parent, sort, search}})
const createDir = (fileName: string, parent: string | null, type: string | null) => file.post<IFile>('file', {
    name: fileName,
    parent,
    type
})

const createFile = (form: FormData,onLoad: (x: number) => void, onIsLoad: Function) => file.post('file/create', form, {
    onUploadProgress: progressEvent => {
        onIsLoad(true)
        onLoad(progressEvent.progress!)
        if(progressEvent.progress == 1) onIsLoad(false)
    }
})

const downloadFile = (fileId: string) => file.get('file/download', {
    responseType: "blob",
    params: {
        id: fileId
    }
})

const deleteFile = (id: string) => file.delete('file/delete', {
    params: {
        id
    }
})

export const fileAPI = {
    getFiles,
    createDir,
    createFile,
    downloadFile,
    deleteFile
}

