import { useOutletContext } from "react-router-dom";

export default function Todos(){
    const context = useOutletContext()

    return (<h1>Todos</h1>)
}