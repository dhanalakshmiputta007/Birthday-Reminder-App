// Modal.js
import React from 'react';
import './modal.css';
import ErrorComponent from './errorcomponet';


const Modal = ({ show, onClose, onConfirm, message,clearMessage ,errorMessage}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
     <div className="modal">
        <div className="modal-header">
          <i className="fas fa-arrow-left back-arrow" onClick={onClose}></i>
          <i className="fas fa-times close-icon" onClick={onClose}></i>
        </div>
      {errorMessage && <ErrorComponent errorMessage={errorMessage} clearMessage={clearMessage}/>}

        <span className='message'>{message}</span>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
