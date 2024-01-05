import React, {useContext} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import "../../styles/App.css"
import MyButton from "../UI/Button/MyButton";
import {AuthContext} from "../../context";
const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            {isAuth && <MyButton onClick = {logout}>
                Выйти
            </MyButton> }
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;
