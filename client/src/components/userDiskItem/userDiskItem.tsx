import React from 'react';
import {IFile} from "../../store/actions/fileAC/types";
import styles from './userDiskItem.module.scss';
import fileImage from './../../assets/file.png';
import dirImage from './../../assets/directory.png';

const UserDiskItem: React.FC<{files: IFile[], onClick: Function, onDownload: Function}> = ({files, onClick, onDownload}) => {
    return (
        <>
            {files.map(item => <>
                <div
                    className={styles.img}>
                    <div className={styles.border}/>
                    {item.type == 'dir' ?
                        <img onClick={() => onClick(item.id)} src={dirImage}/> :
                        <img src={fileImage}/>}
                </div>
                <div className={styles.name}>
                    {item.name}
                </div>
                {!(item.type == 'dir') && <div className={styles.download} onClick={() => onDownload(item.id, item.name, item.type)}>
                    Download
                </div>}
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