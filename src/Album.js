import { Outlet, useOutletContext, useParams } from "react-router-dom";

export default function Album() {
    const { id } = useParams()

    return (
        <>
            <h1>Album {id}</h1>
            <Outlet context={{ albumId: id }} />
        </>
    );
}