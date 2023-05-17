import { NavLink, Outlet, useParams } from "react-router-dom";
import { clearKeyLS } from "./Hooks";
import './Layout.css'

export default function Layout(){
    const { id } = useParams()
    
    return (
        <>
        <div class="container">
            <NavLink className='nav-link left-nav' to='info'>Info</NavLink>
            <NavLink className='nav-link' to='todos'>Todos</NavLink>
            <NavLink className='nav-link' to='posts'>Posts</NavLink>
            <NavLink className='nav-link' to='albums'>Albums</NavLink>
            <NavLink className='nav-link right-nav' to='/login' onClick={()=>clearKeyLS('loggedUser')}>Logout</NavLink>
        </div>

        <Outlet context={{userId : id}}/>
        </>
    )
}