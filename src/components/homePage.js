import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoDataFound from '../utils/nodatafound';
import DeleteModal from '../utils/modal';
import reducer from '../reducer/birthdayReminderReducer'
import ErrorComponent from '../utils/errorcomponet';
import { isErrorDispaly } from './api';
import { formatDate } from './dateformate';


const HomePage = () => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [personToDelete, setPersonToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);

  const [loader, setLoader] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = () => {
    setLoader(true);
    axios.get(`${apiUrl}/api/people`)
      .then(response => {
        setLoader(false);
        setPeople(response.data);
      })
      .catch(error => {
        setLoader(false);
        setErrorMessage(isErrorDispaly(error));
      });
  }
  const handleButton = () => {
    navigate(`/add-person`);
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/people/${id}`);
      getPersons();
      closeModal();
    } catch (error) {
      setDeleteErrorMessage(isErrorDispaly(error));
    }
  };

  const openModal = (personId) => {
    setPersonToDelete(personId);
    setShowModal(true);
  };
  const handleEdit = (personId) => {
    navigate(`/edit/${personId}`);

  }
  const closeModal = () => {
    setShowModal(false);
    setPersonToDelete(null);
    setErrorMessage();
    setDeleteErrorMessage();
  };
  const clearMessage = () => {
    setErrorMessage(null);
    setDeleteErrorMessage();


  }
  return (
    <div>
      <h1>Birthday Reminder</h1>
      <p>Click on a person's name to see the birthday reminder.</p>

      <button type="submit" disabled={false} className='button' onClick={handleButton}>Go To Create Person</button>

      <div className="people-list">
       { errorMessage&&<ErrorComponent errorMessage={errorMessage} clearMessage={clearMessage}/>}
        {/* {!loader && people.map(person => (
          <div key={person._id} className="person-card">
            <i class="fa-solid fa-pen-to-square" onClick={() => handleEdit(person._id)} ></i>
            <i className="fa-solid fa-trash"
              onClick={() => openModal(person._id)}
            ></i>

            <img src={person.photo} alt={person.name} />
            <h3>
            {formatDate(person.date)}
            </h3>
            <h3>{person.name}</h3>
            <Link to={`/notification/${person._id}`}>View Birthday Reminder</Link>
          </div>
        ))} */}
        {!loader && people.map(person => (
  <div key={person._id} className="person-card">
    <div className="person-info">
      <div className='person-name'>{person.name}</div> {/* Name aligned to the left */}
      <div className="action-icons"> {/* Icons aligned to the right */}
        <i className="fa-solid fa-pen-to-square" title="Edit Person" onClick={() => handleEdit(person._id)}></i>
        <i className="fa-solid fa-trash" title="Delete Person" onClick={() => openModal(person._id)}></i>
      </div>
    </div>
    <img src={person.photo} alt={person.name} />
    <div className='person-date'>{formatDate(person.date)}</div>
    <Link to={`/notification/${person._id}`}>View Birthday Reminder</Link>
  </div>
))}

        {loader && people.length === 0 && (
          <div className="loader-container">
            <i className="fa-solid fa-spinner loader"></i>
          </div>
        )}
        {people.length <= 0 && <NoDataFound />}
      </div>
      {personToDelete && showModal &&
        <DeleteModal show={showModal}
          onClose={closeModal}
          errorMessage={deleteErrorMessage}
          clearMessage={clearMessage}
          onConfirm={() => handleDelete(personToDelete)}
          message="Are you sure you want to delete this person?" />}
    </div>
  );
};

export default HomePage;
