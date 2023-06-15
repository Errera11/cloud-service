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

export const fileAPI = {
    getFiles
}