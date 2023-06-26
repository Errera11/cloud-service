export interface IFilesInitialState {
    files: IFile[],
    currentDir: string,
    error: string,
    loaded: number,
    isLoading: boolean,
    view: 'rect' | 'list'
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
    SET_FILES = 'SET_FILES',
    CREATE_FILE = 'CREATE_FILE',
    CREATE_DIR = 'CREATE_DIR',
    DOWNLOAD_FILE = 'DOWNLOAD_FILE',
    DELETE_FILE = 'DELETE_FILE',
    SET_LOAD = 'SET_LOAD'
}