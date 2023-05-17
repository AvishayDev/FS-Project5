import React, { useState, useEffect } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import "./Albums.css"

export default function Albums() {
  const { userId } = useOutletContext();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        const data = await response.json();
        setAlbums(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []); // only first time

  return (
    <div className="albums-container">
      <h1 className="albums-title">Albums</h1>
      <ul className="albums-list">
        {albums.map((album) => (
          <li key={album.id} className="albums-list-item">
            <Link to={`${album.id}/photos`} className="albums-list-link">
              {album.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
