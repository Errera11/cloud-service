import React, {useEffect, useState} from 'react';
import styles from './UserDisk.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setFiles} from "../../store/actions/fileAC/fileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UserDiskItem from "../../components/userDiskItem/userDiskItem";
import CreateFileModal from "../../components/createFileModal/CreateFileModal";

const UserDisk = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setFiles())
            .unwrap()
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }, [])
    const files = useTypedSelector(state => state.file.files)
    const [isModal, setIsModal] = useState<boolean>(false)
    return (
        <div className={styles.container}>
            <div style={{cursor: 'pointer'}} onClick={() => setIsModal(true)}>Create directory</div>
            <div className={styles.info}>
                <div className={styles.name}>Name</div>
                <div>Date</div>
                <div>Size</div>
            </div>
            <div className={styles.files}>
                <UserDiskItem files={files}/>
            </div>
            {isModal && <CreateFileModal isActive={isModal} setIsActive={setIsModal} /> }
        </div>
    );
};

export default UserDisk;