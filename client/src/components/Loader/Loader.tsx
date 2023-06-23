import React from 'react';
import styles from './Loader.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {animated, useTransition} from "@react-spring/web";

interface IProps {
    progress: number
}

const Loader = () => {
    const {loaded, isLoading} = useTypedSelector(state => state.file)
    const transition = useTransition(isLoading, {
        enter: {opacity: 1},
        leave: {opacity: 0},
        config: {
            duration: 500
        }
    })

    return (
        transition((style, item) => (
            (item &&
            <animated.div style={style}>
                <div className={styles.container}>
                    <div className={styles.loader}>
                        <div className={styles.title}>
                            File uploading...
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.barBg}/>
                            <div className={styles.progressBar} style={{width: `${Math.ceil(loaded * 100)}%`}}/>
                        </div>
                        <div className={styles.percentage}>{Math.round(loaded * 100)}%</div>
                    </div>
                </div>
            </animated.div>))
        )
    );
};

export default Loader;