import React from 'react';
import styles from './Button.module.scss'

interface IProps {
    children: React.ReactElement | string
    onClick: Function
}

const Button: React.FC<IProps> = ({children, onClick}) => {
    return (
        <div className={styles.button}
            onClick={() => onClick()}>
            {children}
        </div>
    );
};

export default Button;