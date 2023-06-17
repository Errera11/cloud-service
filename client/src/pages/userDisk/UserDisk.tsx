import React, {useEffect, useMemo, useState} from 'react';
import styles from './UserDisk.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setFiles} from "../../store/actions/fileAC/fileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UserDiskItem from "../../components/userDiskItem/userDiskItem";
import CreateFileModal from "../../components/createFileModal/CreateFileModal";
import {setDirectory} from "../../store/reducers/fileReducer";

const UserDisk = () => {
    const dispatch = useAppDispatch()
    const currentDir = useTypedSelector(state => state.file.currentDir)
    const id = useTypedSelector(state => state.user.user?.id)
    const [dirStack, setDirStack] = useState<Array<string>>([])

    useEffect(() => {
        dispatch(setDirectory(id!))
    }, [])

    useEffect(() => {
        console.log('rerender');
        dispatch(setFiles(currentDir))
            .unwrap()
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }, [currentDir])

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

    const createFile = document.createElement('input')
    createFile.addEventListener('change', (event) => {
        console.log('1');
    })

    return (
        <div className={styles.container}>
            <div style={{cursor: 'pointer'}} onClick={() => setIsModal(true)}>Create directory</div>
            <div style={{cursor: 'pointer'}} onClick={() => backDirStep()}>Previous directory</div>
            <div style={{cursor: 'pointer'}} onClick={() => createFile.click()}>Upload File</div>
            <div className={styles.info}>
                <div className={styles.name}>Name</div>
                <div>Date</div>
                <div>Size</div>
            </div>
            <div className={styles.files}>
                <UserDiskItem
                    onClick={setDir}
                    files={files}/>
            </div>
            {isModal && <CreateFileModal isActive={isModal} setIsActive={setIsModal} /> }
        </div>
    );
};

export default UserDisk;