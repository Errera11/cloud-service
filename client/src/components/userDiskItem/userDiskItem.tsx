import React from 'react';
import {IFile} from "../../store/actions/fileAC/types";
import styles from './userDiskItem.module.scss';
import fileImage from './../../assets/file.png';
import dirImage from './../../assets/directory.png';
import FileMenu from "../fileMenu/FileMenu";
import formatFileSize from "../../utils/formatFileSize";
import {useTransition, animated} from "@react-spring/web";

const UserDiskItem: React.FC<{
    files: IFile[],
    onClick: Function,
    onDelete: Function,
    onDownload?: Function
}> = ({files, onClick, onDelete, onDownload}) => {

    const transition = useTransition(files, {
        from: {
            scale: 0,
        },
        enter: {scale: 1},
        leave: {scale: 0},
    })
    return transition((style, item) => {
        return <animated.div style={{...style}} className={styles.cont}>
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
                {formatFileSize(item.size)}
            </div>
            <FileMenu
                fileType={item.type} onDelete={onDelete} onDownload={onDownload} fileId={item.id}
                fileName={item.name}/>
        </animated.div>
    })
};

export default UserDiskItem;