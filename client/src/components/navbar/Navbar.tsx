import React from 'react';
import styles from './Navbar.module.scss'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../appRouter/routeConstants";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {userSlice} from "../../store/reducers/userReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch"
import listView from '../../assets/listView.png';

const Navbar = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.user)
    const {logOut} = userSlice.actions
    const dispatch = useAppDispatch()
    return (
        <div className={styles.container}>
            <div className={styles.disk} onClick={() => navigate(routes.DISK)}>
                Cloud
            </div>
            <div className={styles.auth}>
                {isAuth ?
                    <>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(routes.HOME)}>{user?.email}</div>
                        <div>
                            {user?.image ? <img src={process.env.REACT_APP_API_URL + '/' + user.image} /> :
                                <img src={listView}/>}
                        </div>
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