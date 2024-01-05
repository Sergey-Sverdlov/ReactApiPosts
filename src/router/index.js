import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import About from "../pages/About";

export const routes = [
    {path: '/about', component: <About /> },
    {path: '/posts', component: <Posts />},
    {path: '/posts/:id', component: <PostIdPage/>}
]