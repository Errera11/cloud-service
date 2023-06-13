import React from 'react';
import styles from './Navbar.module.scss'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../appRouter/routeConstants";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {userSlice} from "../../store/reducers/userReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";

const Navbar = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.user)
    const {logOut} = userSlice.actions
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <div className={styles.home} onClick={() => navigate(routes.HOME)}>
                Home
            </div>
            <div className={styles.auth}>
                {isAuth ?
                    <>
                        <div>{user?.email}</div>
                        <Button onClick={() => dispatch(logOut())}>Log Out</Button>
                    </>
                    :
                    <>
                        <Button onClick={() => navigate(routes.SIGN_IN)}>
                            Sign In
                        </Button>
                        <Button onClick={() => navigate(routes.SIGN_UP)}>
                            Sign Up
                        </Button>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;