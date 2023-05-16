import React, { useState, useEffect } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';

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
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`${album.id}/album`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
