import { Link, Outlet, useParams } from "react-router-dom";

export default function Layout(){
    const { id } = useParams()
    
    return (
        <>
        <Link to='info'>Info</Link>
        <br/>
        <Link to='todos'>Todos</Link>
        <br/>
        <Link to='posts'>Posts</Link>
        <br/>
        <Link to='albums'>Albums</Link>
        <br/>

        <Outlet context={{userId : id}}/>
        </>
    )
}