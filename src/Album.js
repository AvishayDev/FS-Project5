import { useOutletContext } from "react-router-dom";

export default function Album(){
    const context = useOutletContext()
    
    return (<h1>Album</h1>)
}