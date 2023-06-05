import React from 'react';
import styles from './Navbar.module.scss'
import Button from "../button/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../appRouter/routeConstants";

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.home}>
                Home
            </div>
            <div className={styles.auth}>
                <Button onClick={() => navigate(routes.SIGN_IN)}>
                    Sign In
                </Button>
                <Button onClick={() => navigate(routes.SIGN_UP)}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Navbar;