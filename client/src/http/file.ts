import axios from "axios";
import {IFile} from "../store/actions/fileAC/types";


const file = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

file.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem('token')
    return config
})

const getFiles = () => file.get<IFile[]>('file')
const createFile = (fileName: string, parentId: string | null, type: string | null) => file.post<IFile>('file', {
    name: fileName,
    parentId,
    type
})

export const fileAPI = {
    getFiles,
    createFile
}