import React, {useState} from 'react';
import styles from './Auth.module.scss'
import {routes} from "../appRouter/routeConstants";
import {NavLink, useNavigate} from "react-router-dom";
import {Validator} from "../../utillities/Validator";
import {signUp} from "../../store/actions/userAC/userAC";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [validate, setValidate]
        = useState<{email: ReturnType<typeof Validator.email>, password: ReturnType<typeof Validator.password>}>({email: {isValidate: true}, password: {isValidate: true}})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {error: authError} = useTypedSelector(state => state.user)
    const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        if (!Validator.email(email).isValidate || !Validator.password(password, 8).isValidate)
            return setValidate({email: Validator.email(email), password: Validator.password(password, 8)})
        dispatch(signUp({email, password}))
            .unwrap()
            .then(() => navigate('/'))
            .catch(e => console.log(e))
    }
    return (
        <div className={styles.container}>
            <div className={styles.title}>Sign Up</div>
            <div className={styles.input}>
                <input
                    className={!validate?.email.isValidate ? styles.validateError: ''}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder={'Email'}/>
                <input
                    className={!validate?.password.isValidate ? styles.validateError: ''}
                    type={'password'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder={'Password'}/>
                <input value={'Sign Up'}
                    type={'submit'} onClick={e => onClickHandler(e)} />
                {!validate?.email.isValidate && <div style={{color: 'red', fontSize: '0.7em'}}>{validate?.email.error}</div>}
                {!validate?.password.isValidate && <div style={{color: 'red', fontSize: '0.7em'}}>{validate?.password.error}</div>}
                {authError && <div style={{color: 'red', fontSize: '0.7em'}}>{authError}</div>}
            </div>
            <div className={styles.description}>
                Already have an account? <NavLink to={routes.SIGN_IN}>Sign In!</NavLink>
            </div>
        </div>
    );
};

export default SignUp;