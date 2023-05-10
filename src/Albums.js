import { useOutletContext } from "react-router-dom";

export default function Albums(){
    const context = useOutletContext()

    return (<h1>Albums</h1>)
}