import { getTitle } from "./Hooks";
import './Posts.css'


export default function Comment({comment}){

    return (
        <div className="comment-div">
            <h3>{getTitle(comment.name)}</h3>
            <p>{comment.email}</p>
            <p>{comment.body}</p>
        </div>
    )
}