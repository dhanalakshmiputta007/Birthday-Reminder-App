// src/ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Your name" />
        <br />
        <label>Email:</label>
        <input type="email" placeholder="Your email" />
        <br />
        <label>Message:</label>
        <textarea placeholder="Your message" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
