import React from 'react';
import styles from './Loader.module.scss'

interface IProps {
    progress: number
}
const Loader: React.FC<IProps> = ({progress}) => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <div className={styles.title}>
                    loader
                </div>
                <div className={styles.barBg} />
                <div className={styles.progressBar} style={{width: progress}}/>
            </div>
        </div>
    );
};

export default Loader;