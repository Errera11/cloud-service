import axios from "axios";
import {IUser} from "../store/actions/userAC/types";

const auth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

interface IResponse {
    user: IUser,
    token: string
}

const signUp = ({email, password}: { email: string, password: string }) => {
    return auth.post<IResponse>('/user/signUp', {email, password})
}

const signIn = ({email, password}: {
    email: string,
    password: string
}) => {
    return auth.post<IResponse>('/user/signIn', {email, password})

}

const tokenAuth = () => {
    return auth.get<IResponse>('/user/auth', {headers: {'authorization': localStorage.getItem('token')}})
}

const uploadImage = (file: FormData) => {
    return auth.post<string>('/user/image', file, {headers: {'authorization': localStorage.getItem('token')}})
}

const deleteImage = () => {
    return auth.delete('/user/deleteImage', {headers: {'authorization': localStorage.getItem('token')}})
}

export default {
    signIn, signUp, tokenAuth, uploadImage, deleteImage
}

