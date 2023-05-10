import { useOutletContext } from "react-router-dom";

export default function Info(){
    const context = useOutletContext()

    return (<h1>Info</h1>)
}