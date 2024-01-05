import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {publicRoutes, privateRoutes} from "../router";
import Login from "../pages/Login";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    console.log(isAuth)
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                )}
                <Route path="*" element={<Posts/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                )}
                <Route path="*" element={<Login />}/>
            </Routes>
    );
};

export default AppRouter;
