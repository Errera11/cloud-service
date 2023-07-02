import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteImage, uploadImage} from "../../store/actions/userAC/userAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './Home.module.scss'


const Home = () => {
    const dispatch = useAppDispatch()
    const {user} = useTypedSelector(state => state.user)

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();
        formData.append('file', e.target.files![0])
        dispatch(uploadImage(formData))
    }

    function onSubmitHandler(e: React.MouseEvent<HTMLInputElement>) {
        e.preventDefault()
        dispatch(deleteImage())
    }

    return (
        <div className={styles.container}>
            {user?.image &&
                <div className={styles.img}>
                    <img src={process.env.REACT_APP_API_URL + '/' + user!.image}/>
                </div>
            }
            <div className={styles.email}>{user?.email}</div>
            <div className={styles.space}>Disk space: {user?.usedSpace}/{user?.diskSpace} bytes</div>
            <input accept={'image/aces'} onChange={onChangeHandler} type={'file'}/>
            <input onClick={e => onSubmitHandler(e)} type={'button'} value={'Delete image'}/>
        </div>
    );
};

export default Home;