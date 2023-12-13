import React, {useMemo, useState} from "react";
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

const App = () => {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'JavaScript', body: 'b'},
        {id: 2, title: 'f', body: 'a'},
        {id: 3, title: 'c', body: 't'},
        {id: 4, title: 'v', body: 'h'},
        {id: 5, title: 'a', body: 'caa'},
    ])


    const [filter, setFilter] = useState({
        sort: '',
        query: ''
    })

    const [model, setModel] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModel(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"}/>
        </div>
    )
}

export default App