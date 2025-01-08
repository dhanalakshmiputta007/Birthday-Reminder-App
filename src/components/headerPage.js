// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importing Header CSS

const Header = () => {
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
          <li>
            <Link to="/contact">Contact Us</Link> {/* Link to Contact Us page */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
