import React, {useState} from 'react';
import styles from './Auth.module.scss'
import {routes} from "../appRouter/routeConstants";
import {NavLink, useNavigate} from "react-router-dom";
import {signUp} from "../../http/auth";

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        signUp({email, password}).then(res => navigate('/'))
            .catch(e => console.log(e))
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>Sign Up</div>
            <div className={styles.input}>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder={'Email'}/>
                <input
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder={'Password'}/>
                <input value={'Sign Up'}
                    type={'submit'} onClick={e => onClickHandler(e)} />
            </div>
            <div className={styles.description}>
                Already have an account? <NavLink to={routes.SIGN_IN}>Sign In!</NavLink>
            </div>
        </div>
    );
};

export default SignIn;