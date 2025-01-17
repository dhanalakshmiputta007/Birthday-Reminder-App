// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import NotificationPage from './components/notificationPage';
import ContactPage from './components/contactPage';
import Header from './components/headerPage'; // Import Header once here
import './App.css'; // Global styles
import AddPerson from './components/createForm';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Birthday-Reminder-App" element={<HomePage />} />
          <Route path="/notification/:id" element={<NotificationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/add-person" element={<AddPerson />} />
          <Route path="/edit/:id" element={<AddPerson />} /> {/* Edit route */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
