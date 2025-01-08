// Modal.js
import React from 'react';
import './modal.css';
import ErrorComponent from './errorcomponet';


const Modal = ({ show, onClose, onConfirm, message,clearMessage ,errorMessage}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
      {errorMessage && <ErrorComponent errorMessage={errorMessage} clearMessage={clearMessage}/>}

        <h3>{message}</h3>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
