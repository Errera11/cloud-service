
export interface IUser {
    id: string
    email: string
    diskSpace: number
    usedSpace: number
    image?: string
}

export interface IInitialState {
    error: string
    user: IUser | null
    isAuth: boolean
}

export enum userActionTypes {
    SET_USER = 'SET_USER',
    SET_ERROR = 'SET_ERROR',
    SET_USER_IMAGE = 'SET_USER_IMAGE'
}