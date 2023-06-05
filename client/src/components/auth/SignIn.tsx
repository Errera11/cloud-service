import React, {useState} from 'react';
import styles from './Auth.module.scss'
import {routes} from "../appRouter/routeConstants";
import {NavLink} from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Sign In</div>
            <div className={styles.input}>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder={'Email'}/>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder={'Password'}/>
                <input value={'Sign In'}
                    type={'submit'} onClick={e => onClickHandler(e)} />
            </div>
            <div className={styles.description}>
                Don't have an account? <NavLink to={routes.SIGN_UP}>Sign Up!</NavLink>
            </div>
        </div>
    );
};

export default SignIn;