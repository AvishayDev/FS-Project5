import React, { useState, useEffect } from 'react';

const InfoComponent = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from api
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
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company.name}</p>
          <p>Street: {user.address.street}</p>
          <p>Suite: {user.address.suite}</p>
          <p>City: {user.address.city}</p>
          <p>Zip Code: {user.address.zipcode}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default InfoComponent;
