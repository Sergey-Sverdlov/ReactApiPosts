import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {routes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route
                    key = {route.path}
                    path={route.path}
                    element={route.component}
                />
            )}
            <Route path="*" element={<Posts/>}/>
        </Routes>
    );
};

export default AppRouter;
