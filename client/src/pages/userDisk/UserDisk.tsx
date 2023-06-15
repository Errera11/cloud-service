import React, {useEffect} from 'react';
import styles from './UserDisk.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setFiles} from "../../store/actions/fileAC/fileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UserDiskItem from "../../components/userDiskItem/userDiskItem";

const UserDisk = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setFiles())
            .unwrap()
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }, [])
    const files = useTypedSelector(state => state.file.files)
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.name}>Name</div>
                <div>Date</div>
                <div>Size</div>
            </div>
            <div className={styles.files}>
                <UserDiskItem files={files}/>
            </div>
        </div>
    );
};

export default UserDisk;