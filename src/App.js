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
import {usePosts} from "./components/hooks/usePosts";
import axios from "axios";
import PostService from "./components/API/PostService";
import Loader from "./components/Loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import getPageCount from "./components/utils/pages";
import pages from "./components/utils/pages";
import {usePagination} from "./components/hooks/usePagination";

const App = () => {
    const [posts, setPosts] = React.useState([])


    const [filter, setFilter] = useState({
        sort: '',
        query: ''
    })

    const [model, setModel] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [pagesArray] = usePagination(totalPages)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModel(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>Получить список постов</button>
            <MyButton style={{marginTop: '30px'}} onClick={() => {
                setModel(true)
            }}>
                Создать пост
            </MyButton>
            <MyModel visible={model} setVisible={setModel}>
                <PostForm create={createPost}/>
            </MyModel>
            <hr style={{margin: "15px"}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Произошла ошибка {postError} </h1>}
            {isPostsLoading ?
                <div style={{display: "flex", justifyContent: 'center', marginTop: '50px', alignItems: 'center'}}>
                    <Loader/>
                </div> :
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"}/>}
            <div className="page__wrapper">
                {pagesArray.map((p, index) =>
                    <span
                        className={page === p ? 'page page__current' : 'page'}
                        key={p}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </span>)}
            </div>

        </div>
    )
}

export default App