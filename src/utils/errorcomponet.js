import React, { useEffect, useState } from 'react';

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
    <div className="no-data-container">
      <div className="no-data-box">
        <span className="close-icon" onClick={clearError}>&#10005;</span>
        <p className="error-text">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
