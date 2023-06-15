import React from 'react';
import {IFile} from "../../store/actions/fileAC/types";
import styles from './userDiskItem.module.scss';
import fileImage from './../../assets/file.png';
import dirImage from './../../assets/directory.png';

const UserDiskItem: React.FC<{files: IFile[]}> = ({files}) => {
    return (
        <>
            {files.map(item => <>
                <div className={styles.img}>
                    <div className={styles.border}/>
                    {item.type == 'dir' ?
                        <img src={dirImage}/> :
                        <img src={fileImage}/>}
                </div>
                <div className={styles.name}>
                    {item.name}
                </div>
                <div className={styles.date}>
                    {item.createdAt.slice(0, 10)}
                </div>
                <div className={styles.size}>
                    {item.size}
                </div>
            </>)}
        </>
    );
};

export default UserDiskItem;