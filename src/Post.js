import { getTitle } from "./Hooks";



export default function Post({post}){

    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </>
    )
}