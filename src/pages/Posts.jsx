import React, {useEffect, useMemo, useState} from "react";
import "../styles/App.css"
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import getPageCount from "../components/utils/pages";
import MyButton from "../components/UI/Button/MyButton";
import MyModel from "../components/UI/MyModel/MyModel";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/pagination/Pagination";


const Posts = () => {
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
            <Pagination page={page} changePage={changePage} totalPages={totalPages} />
        </div>
    )
}

export default Posts