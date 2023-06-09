import React, {useEffect, useMemo, useState} from 'react';
import styles from './UserDisk.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {createFile, deleteFile, setFiles} from "../../store/actions/fileAC/fileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UserDiskItem from "../../components/userDiskItem/userDiskItem";
import CreateFileModal from "../../components/createFileModal/CreateFileModal";
import {setDirectory, setIsLoading, setLoaded, setView} from "../../store/reducers/fileReducer";
import Button from "../../components/button/Button";
import {fileAPI} from "../../http/file";
import {appReducer} from "../../store/reducers/appReducer";
import Search from "../../components/search/Search";
import listView from '../../assets/listView.png'
import rectView from '../../assets/rectView.png'

const UserDisk = () => {
    const dispatch = useAppDispatch()
    const {currentDir} = useTypedSelector(state => state.file)
    const id = useTypedSelector(state => state.user.user?.id)
    const [dirStack, setDirStack] = useState<Array<string>>([])
    const [sort, setSort] = useState('')
    useEffect(() => {
        dispatch(setDirectory(id!))
    }, [])

    useEffect(() => {
        dispatch(appReducer.actions.setUserDiskLoading(true))
        dispatch(setFiles({parentId: currentDir, sort, search: ''}))
            .unwrap()
            .then(res => console.log(res))
            .catch(e => console.log(e))
            .finally(() => dispatch(appReducer.actions.setUserDiskLoading(false)))
    }, [currentDir, sort])

    const files = useTypedSelector(state => state.file.files)
    const [isModal, setIsModal] = useState<boolean>(false)
    useMemo(() => {
        dispatch(setDirectory(dirStack.slice(-1)[0] || id!))
    }, [dirStack])
    const backDirStep = () => {
        setDirStack(dirStack.slice(0, -1))
    }

    const setDir = (dir: string) => {
        setDirStack(prev => [...prev, dir])
        dispatch(setDirectory(dir))
    }

    const onLoad = (x: number) => {
        dispatch(setLoaded(x))
    }
    const onIsLoad = (x: boolean) => {
        if (!x) setTimeout(() => dispatch(setIsLoading(x)), 1500)
        else dispatch(setIsLoading(x))
    }
    const fileInputElement = document.createElement('input')
    fileInputElement.type = 'file';
    fileInputElement.addEventListener('change', (event: Event) => {
        const file = (event.target as HTMLInputElement).files![0];
        const form = new FormData()
        form.append('file', file)
        form.append('parent', currentDir)
        dispatch(createFile({form, onLoad, onIsLoad}))
    })

    const [isDrag, setIsDrag] = useState(false)
    const fileDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const form = new FormData()
        form.append('file', e.dataTransfer.files[0])
        form.append('parent', currentDir)
        dispatch(createFile({form, onLoad, onIsLoad}))
        setIsDrag(false)
    }

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDrag(true)
    }

    const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setIsDrag(false)
    }

    const onDownloadFileHandler = async (id: string, fileName: string, fileExt: string) => {
        const {data: blob} = await fileAPI.downloadFile(id)
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileExt}`
        link.click()
    }

    function onDeleteHandler(fileId: string) {
        dispatch(deleteFile(fileId))
    }
    function onSeacrh(str: string) {
        dispatch(setFiles({parentId: currentDir, sort, search: str}))
    }

    return (
        <div onDragOver={(e) => onDragOverHandler(e)} onDragLeave={(e) => onDragLeaveHandler(e)}
             className={styles.container}>
            <div className={styles.loader}>
                <Search onSearch={onSeacrh} />
            </div>
            <div className={styles.viewSort}>
                <select
                    value={sort}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)} placeholder={'Sort By'}>
                    <option value={'name'}>By name</option>
                    <option value={'size'}>By date</option>
                    <option value={'createdAt'}>By size</option>
                </select>
                <img onClick={() => dispatch(setView('list'))} src={listView} />
                <img onClick={() => dispatch(setView('rect'))} src={rectView} />
            </div>
            <div className={styles.interact}>
                <Button onClick={() => setIsModal(true)}>Create directory</Button>
                <Button onClick={() => backDirStep()}>Previous directory</Button>
                <Button onClick={() => fileInputElement.click()}>Upload File</Button>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>Name</div>
                <div className={styles.date}>Date</div>
                <div className={styles.size}>Size</div>
            </div>
            <div className={styles.files}>
                <UserDiskItem
                    onDownload={onDownloadFileHandler}
                    onDelete={onDeleteHandler}
                    onClick={setDir}
                    files={files}/>
            </div>

            {isModal && <CreateFileModal isActive={isModal} setIsActive={setIsModal}/>}
            {isDrag && <div className={styles.dropArea} onDrop={(event) => fileDropHandler(event)}>
                Drop your file here!
            </div>}
        </div>
    );
};

export default UserDisk;