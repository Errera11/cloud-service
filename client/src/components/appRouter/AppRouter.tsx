import React from 'react';
import {privateRoutes, publicRoutes} from "./routeConstants";
import {Route, Routes} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.user)
    return (
        <Routes>
            {isAuth ? privateRoutes.map((item: { path: string, element: React.ReactElement }) => <Route
                    key={item.path}
                    path={item.path}
                    element={item.element}/>)
                :
                publicRoutes.map((item: { path: string, element: React.ReactElement }) => <Route
                    key={item.path}
                    path={item.path}
                    element={item.element}/>)
            }
        </Routes>
    );
};

export default AppRouter;