

export interface IFilesInitialState {
    files: IFile[],
    currentDir: string
}

export interface IFile {
    id: string,
    name: string,
    path: string,
    type: string,
    user_id: string,
    parentId: string,
    size: number,
    createdAt: string
}

export enum FileActionTypes {
    SET_FILES = 'SET_FILES'
}