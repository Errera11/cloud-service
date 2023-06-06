import axios from "axios";

const auth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const signUp = async ({email, password}: {email: string, password: string}) => {
    return await auth.post('/user/signUp', {email, password})
}

const signIn = async ({email, password}: {email: string, password: string}) => {
    return await auth.post('/user/signIn', {email, password})
}

export default {
    signIn, signUp
}

//TODO interceptors
