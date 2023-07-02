import React, {useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {uploadImage} from "../../store/actions/userAC/userAC";

const Home = () => {
    const dispatch = useAppDispatch()
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const formData = new FormData();
        formData.append('file', e.target.files![0])
        dispatch(uploadImage(formData))
    }

    return (
        <div>
            <div>
                <input accept={'image'} placeholder={'Upload image'} type={'file'} onChange={onChangeHandler}/>
            </div>
        </div>
    );
};

export default Home;