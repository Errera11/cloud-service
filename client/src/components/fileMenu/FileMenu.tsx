import React, {useState} from 'react';
import styles from './FileMenu.module.scss'
import menu from "../../assets/menu.png";

interface IProps {
    fileType: string
    onDelete: Function
    onDownload?: Function
    fileId: string
    fileName: string
}

const FileMenu: React.FC<IProps> = ({fileType, onDelete, onDownload, fileId, fileName}) => {
    const [isMenu, setIsMenu] = useState(false)
    return (
        <div className={styles.menu}>
            <div className={styles.img} onClick={() => setIsMenu(prev => !prev)}>
                <img src={menu}/>
            </div>
            {isMenu &&
                <div className={styles.container}>
                    {fileType != 'dir' && <div
                        className={styles.download}
                        onClick={() => onDownload && onDownload(fileId, fileName, fileType)}>
                        Download
                    </div>}
                    <div
                        onClick={() => {
                            setIsMenu(false)
                            onDelete(fileId)
                        }}
                        className={styles.delete}>
                        Delete
                    </div>
                </div>
            }
        </div>
    );
};

export default FileMenu;