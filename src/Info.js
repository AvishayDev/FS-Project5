import React, { useState, useEffect } from 'react';

const InfoComponent = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user.name ? (
        <div>
          <h2>{user.name}</h2>
          <p><strong>Username:</strong>  {user.username}</p>
          <p><strong>Email:</strong>  {user.email}</p>
          <p><strong>Phone:</strong>  {user.phone}</p>
          <p><strong>Website:</strong>  {user.website}</p>
          <p><strong>Company:</strong>  {user.company.name}</p>
          <p><strong>Street:</strong>  {user.address.street}</p>
          <p><strong>Suite: </strong> {user.address.suite}</p>
          <p><strong>City:</strong>  {user.address.city}</p>
          <p><strong>Zip Code:</strong> {user.address.zipcode}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default InfoComponent;
