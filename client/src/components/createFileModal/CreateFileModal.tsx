import React, {useState} from 'react';
import styles from './createFileModal.module.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {createDir} from "../../store/actions/fileAC/fileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
interface IProps {
    isActive: boolean,
    setIsActive: Function
}

const CreateFileModal: React.FC<IProps> = ({isActive, setIsActive}) => {
    const [name, setName] = useState<string>('')
    const dispatch = useAppDispatch()
    const currentDir = useTypedSelector(state => state.file.currentDir)
    const createHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        dispatch(createDir({fileName: name, type: '', parent: currentDir}))
            .unwrap()
            .then(() => setIsActive(false))
    }
    return (
        <div className={styles.container}>
            <div className={styles.background} onClick={() => setIsActive(false)}/>
            <div className={styles.content}>
                <div>Create File</div>
                <input type={'text'} placeholder={'Directory name'} value={name} onChange={e => setName(e.target.value)}/>
                <input type={'submit'} onClick={createHandler} value={'Create'}/>
            </div>
        </div>
    );
};

export default CreateFileModal;