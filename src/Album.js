import { Outlet, useOutletContext, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Album() {
    const { id } = useParams()
    const [photos, setPhotos] = useState([]);
    const [loadedPhotos, setLoadedPhotos] = useState(0);
    
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/albums/${id}/photos`
                );
                const data = await response.json();
                setPhotos(data);
                setLoadedPhotos(10);
                console.log(data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
    
        fetchAlbums();
    }, [id]);

    const loadMorePhotos = () => {
        setLoadedPhotos((prevLoadedPhotos) => prevLoadedPhotos + 10);
    };

    return (
        <div>
            <h1>Album {id}</h1>
            <Outlet context={{ albumId: id }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div>
                    <h2>Photos from Album {id} </h2>
                    <div className="album-photo">
                        {photos.slice(0, loadedPhotos).map((photo) => (
                            <img src={photo.thumbnailUrl}/>
                        ))}
                    </div>
                </div>
                
                <button onClick={loadMorePhotos}>Load More</button>
            </div>
        </div> 
    );
}
