import React, { useEffect, useState } from 'react';
import ParagraphComponent from './ParagraphComponent';

const ErrorComponent = ({errorMessage, clearMessage}) => {
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const clearError = () => {
    setError(null);
    if (clearMessage) {
      clearMessage(); // Clear the message from the parent if needed
    }
  };

  return (
    <div className="error-data-container">
  <div className="error-data-box">
    <span className="error-icon" onClick={clearError}>
      <i className="fa-solid fa-xmark"></i>
    </span>
    <p className="error-text">{errorMessage}</p>
  </div>
</div>

  );
    
  
};
export default ErrorComponent;
