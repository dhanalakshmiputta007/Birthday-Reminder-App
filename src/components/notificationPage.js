import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NotificationPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/people/${id}`)
      .then(response => {
        setPerson(response.data);
      })
      .catch(error => {
        console.error('Error fetching person:', error);
      });
  }, [id]);

  const checkBirthday = () => {
    const today = new Date();
    const todayDate = `${today.getMonth() + 1}-${today.getDate()}`;
    if (person && person.date === todayDate) {
      new Notification(`It's ${person.name}'s birthday today!`);
    }
  };

  useEffect(() => {
    if (person) {
      checkBirthday();
    }
  }, [person]);

  return (
    <div>
      {person ? (
        <div>
          <h2>{person.name}'s Birthday</h2>
          <p>Birthday: {person.date}</p>
          <img src={person.photo} alt={person.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NotificationPage;
