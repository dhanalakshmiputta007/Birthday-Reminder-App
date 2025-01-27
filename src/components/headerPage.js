// src/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importing Header CSS

const Header = () => {
  const [notification,setNotification]=useState(null);
  const  handleNotificationClick=()=> {
    setNotification ('No new notifications!');
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🎉 Birthday Reminder</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link> {/* Link to Home page */}
          </li>
          {/* <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <button onClick={handleNotificationClick}>
              <i className="fas fa-bell"></i>
            </button> */}
          {/* </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
