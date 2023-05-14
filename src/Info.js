import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const InfoComponent = () => {
  const [user, setUser] = useState({});
  const { id } = useParams()
  console.log(id)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from api
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        console.log(data);
        setUser(data);
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      {user.name ? (
        <div>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {/* Render additional user information as needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default InfoComponent;
