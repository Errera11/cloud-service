import React, {useState} from 'react';
import {IFile} from "../../store/actions/fileAC/types";
import styles from './userDiskItem.module.scss';
import fileImage from './../../assets/file.png';
import dirImage from './../../assets/directory.png';
import menu from '../../assets/menu.png'
import FileMenu from "../fileMenu/FileMenu";

const UserDiskItem: React.FC<{files: IFile[], onClick: Function, onDelete: Function, onDownload?: Function}> = ({files, onClick, onDelete, onDownload}) => {


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
                <div className={styles.date}>
                    {item.createdAt.slice(0, 10)}
                </div>
                <div className={styles.size}>
                    {item.size}
                </div>
                <FileMenu
                    fileType={item.type} onDelete={onDelete} onDownload={onDownload} fileId={item.id}
                fileName={item.name}/>
            </>)}
        </>
    );
};

export default UserDiskItem;