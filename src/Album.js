import { Outlet, useOutletContext, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Album.css"
export default function Album() {
    const { id } = useParams()
    const [photos, setPhotos] = useState([]);
    const [loadedPhotos, setLoadedPhotos] = useState(0);
    
    useEffect(() => {
            const fetchAlbums = async () => {
            try {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/albums/${id}/photos?_start=0&_limit=10`
                );
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching ten first pics:', error);
            }
        };
        
        console.log('id call')
        fetchAlbums();
    }, [id]);

    useEffect(() => {
        const fetchTenMore = async () => {
        try {
            const response = await fetch(
              `https://jsonplaceholder.typicode.com/albums/${id}/photos?_start=${loadedPhotos}&_limit=10`
            );
            const data = await response.json();
            setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        } catch (error) {
            console.error('Error fetching ten more pics:', error);
        }
    };

    console.log('loaded photoes call')
    fetchTenMore();
}, [loadedPhotos]);

    const loadMorePhotos = () => {
        setLoadedPhotos((prevLoadedPhotos) => prevLoadedPhotos + 10);
    };

    return (
        <div>
            <h1>Album {id}</h1>

            <div className="album">
                <div>
                    <h2>Photos from Album {id} </h2>
                    <div className="album-photo">
                        {photos.map((photo) => (
                            <img src={photo.thumbnailUrl} alt={photo.title}/>   
                        ))}
                    </div>
                </div>
                
                <button onClick={loadMorePhotos}>Load More</button>
            </div>
        </div> 
    );
}