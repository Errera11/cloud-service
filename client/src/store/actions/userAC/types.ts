
export interface IUser {
    id: string
    email: string
    diskSpace: number
    usedSpace: number
    image?: string
}

export interface IInitialState {
    user: IUser | null
    isAuth: boolean
}

export enum userActionTypes {
    SET_USER = 'SET_USER'
}