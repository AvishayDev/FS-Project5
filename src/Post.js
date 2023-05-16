import { getTitle } from "./Hooks";



export default function Post({post}){

    return (
        <>
            <h1>{getTitle(post.title)}</h1>
            <p>{post.body}</p>
        </>
    )
}