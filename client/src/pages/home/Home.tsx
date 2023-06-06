import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Home = () => {
    const  x = useTypedSelector(state => state.user)
    console.log(x);
    return (
        <div>
            Hello Home
        </div>
    );
};

export default Home;