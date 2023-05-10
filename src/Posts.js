import { useOutletContext } from "react-router-dom";

export default function Posts(){
    const context = useOutletContext()

    return (<h1>Posts</h1>)
}