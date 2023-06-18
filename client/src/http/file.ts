import axios from "axios";
import {IFile} from "../store/actions/fileAC/types";


const file = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

file.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem('token')
    return config
})

const getFiles = (parent: string) => file.get<IFile[]>('file', {params: {parent}})
const createDir = (fileName: string, parent: string | null, type: string | null) => file.post<IFile>('file', {
    name: fileName,
    parent,
    type
})
const createFile = (form: any) => file.post('file/create', form)

export const fileAPI = {
    getFiles,
    createDir,
    createFile
}