import { getTitle } from "./Hooks";
import './Posts.css'


export default function Comment({comment}){

    return (
        <div className="comment-div">
            <h2>{comment.name}</h2>
            <h4>{comment.email}</h4>
            <p>{comment.body}</p>
        </div>
    )
}