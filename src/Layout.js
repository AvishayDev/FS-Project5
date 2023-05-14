import { Link, Outlet, useParams } from "react-router-dom";
import { clearKey } from "./Hooks";
export default function Layout(){
    const { id } = useParams()
    
    return (
        <>
        <div>
            <Link to='info'>Info</Link>
            <br/>
            <Link to='todos'>Todos</Link>
            <br/>
            <Link to='posts'>Posts</Link>
            <br/>
            <Link to='albums'>Albums</Link>
            <br/>
            <Link to='/login' onClick={()=>clearKey('loggedUser')}>Logout</Link>
        </div>

        <Outlet context={{userId : id}}/>
        </>
    )
}