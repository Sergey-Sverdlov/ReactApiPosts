import React, {useEffect, useMemo, useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/Select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModel from "./components/UI/MyModel/MyModel";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import getPageCount from "./components/utils/pages";
import pages from "./components/utils/pages";
import {usePagination} from "./hooks/usePagination";
import Pagination from "./components/pagination/Pagination";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./pages/About";
import Posts from "./pages/Post";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about" element = {<About />} />
                <Route path="/posts" element = {<Posts />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App