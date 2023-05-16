import { useOutletContext } from "react-router-dom";
import { useFetch } from "./Hooks";
import { useState } from "react";
import  Post  from "./Post";
import Comment from './Comment';
import './Posts.css'

export default function Posts(){
    const context = useOutletContext();
    const { userId } = context
    const [posts] = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`,[])
    const [comments,setCommentsUrl,errorMessage,isLoading] = useFetch('',[])
    const [selectedIndex,setIndex] = useState(null)
    const defaultStyle = 'default-style'
    const clickStyle = 'click-style'


    return (
        <>
            <h1>Posts</h1>
            <div>
                {
                posts
                    .map((post, index)=>{
                        const handleClick = () => {
                            setIndex(prevIndex => prevIndex === index ? null : index)
                            setCommentsUrl(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                        }
                        return (
                            <div className={index === selectedIndex ? clickStyle : defaultStyle} onClick={handleClick}>
                                <Post post={post}/>
                                <ul>{index === selectedIndex ? 
                                    isLoading ? 'Loading...' :
                                    errorMessage ? errorMessage :
                                    comments.map((comment => {
                                        return <Comment comment={comment}/>
                                })):<></>}</ul>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}