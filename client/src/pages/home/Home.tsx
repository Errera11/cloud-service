import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Home = () => {
    const x = useTypedSelector(state => state)
    console.log(x);
    return (
        <div>

        </div>
    );
};

export default Home;