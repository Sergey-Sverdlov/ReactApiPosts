import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getByID(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostID(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            {isLoading
                ? <Loader/>
                : <div>
                    {post.id}. <br/>
                    {post.title} <br/>
                </div>}
            <h1>Комментарии</h1>
            {isComLoading ?
                <Loader/>
                : <div>
                    {comments.map((comm, index) =>
                        <div>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>}
        </div>
    );
};

export default PostIdPage;
