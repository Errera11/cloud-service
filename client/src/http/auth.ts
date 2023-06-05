import axios from "axios";

const auth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const signUp = async ({email, password}: {email: string, password: string}) => {
    return await auth.post('/user/signUp', {email, password})
}
//TODO interceptors
