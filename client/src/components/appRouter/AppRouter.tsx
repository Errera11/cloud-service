import React from 'react';
import {privateRoutes, publicRoutes} from "./routeConstants";
import {Route, Routes} from "react-router-dom";

const AppRouter = () => {
    const isAuth = false
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