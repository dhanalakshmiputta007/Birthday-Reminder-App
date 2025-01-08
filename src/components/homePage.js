import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoDataFound from '../utils/nodatafound';
import DeleteModal from '../utils/modal';
import reducer from '../reducer/birthdayReminderReducer'
import ErrorComponent from '../utils/errorcomponet';


const HomePage = () => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate(); 
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [personToDelete, setPersonToDelete] = useState(null);
  const [errorMessage,setErrorMessage]=useState(null)
//   const [state, dispatch] = useReducer(reducer, initialState);
const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getPersons();
  }, []);

  const getPersons=()=>{
    axios.get(`${apiUrl}/api/people`)
    .then(response => {
      setPeople(response.data);
    })
    .catch(error => {
        setErrorMessage(error);
    });
  }
  const handleButton=()=>{
    navigate(`/add-person`);
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/people/${id}`);
      getPersons();
      closeModal();
      // Remove the deleted person from the state
    //   setPeople(prevPeople => prevPeople.filter(person => person._id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    //   alert('Error deleting person');
    }
  };
  
  const openModal = (personId) => {
    setPersonToDelete(personId);
    setShowModal(true);
  };
const handleEdit=(personId)=>{
    navigate(`/edit/${personId}`);

}
  // Close the modal without taking action
  const closeModal = () => {
    setShowModal(false);
    setPersonToDelete(null);
    setErrorMessage();
  };
  const clearMessage=()=>{
    setErrorMessage(null);

  }
  return (
    <div>
      <h1>Birthday Reminder</h1>
      <p>Click on a person's name to see the birthday reminder.</p>

      <button type="submit" disabled={false} className='button' onClick={handleButton}>Go To Create Person</button>
      <div className="people-list">
        {people.map(person => (
          <div key={person._id} className="person-card">
            <i class="fa-light fa-pen-to-square" onClick={() => handleEdit(person._id)} ></i>
            <i className="fa-solid fa-trash" 
            onClick={() => openModal(person._id)} 
           ></i>

            <img src={person.photo} alt={person.name} />
            <h3>{person.date}</h3>
            <h3>{person.name}</h3>
            <Link to={`/notification/${person._id}`}>View Birthday Reminder</Link>
          </div>
        ))}
        {people.length===0&&<NoDataFound/>}
      </div>
      {personToDelete &&showModal&&
      <DeleteModal  show={showModal}
      onClose={closeModal}
      errorMessage={errorMessage}
      clearMessage={clearMessage}
      onConfirm={() => handleDelete(personToDelete)}
      message="Are you sure you want to delete this person?"/>}
    </div>
  );
};

export default HomePage;
