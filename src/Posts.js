import { useOutletContext } from "react-router-dom";
import { useFetch } from "./Hooks";
import { useState } from "react";

export default function Posts(){
    const context = useOutletContext();
    const { userId } = context
    const [posts,setUrl] = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`,[])
    const [comments,setCommentsUrl,errorMessage,isLoading] = useFetch('',[])
    const [selectedIndex,setIndex] = useState(null)
    const defaultStyle = {background:'white'}
    const clickStyle = {background:'blue'}


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
                            <div style={index === selectedIndex ? clickStyle : defaultStyle} onClick={handleClick}>
                                <h1>{post.title}</h1>
                                <p>{post.body}</p>
                                <ul>{index === selectedIndex ? 
                                    isLoading ? 'Loading...' :
                                    comments.map((comment => {
                                        return (<div>
                                                    <h3>{comment.name}</h3>
                                                    <p>{comment.email}</p>
                                                    <p>{comment.body}</p>
                                                </div>)
                                })):<></>}</ul>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}