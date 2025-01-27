import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DrawerPlacement from '../utils/drawercomponent';
import { isErrorDispaly } from './api';

const ViewPerson = ({id,closeDrawer,openDrawer}) => {
  const [person, setPerson] = useState(null);
  const [loader,setLoader]=useState(false)
  const [errorMessage,setErrorMessage]=useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (id) {
        getPersonById(id);
    }
}, [])
const getPersonById = async (id) => {
    setLoader(true);
    setErrorMessage(null)
    try {
        const response = await axios.get(`${apiUrl}/api/people/${id}`);
        setPerson(response.data);
        setLoader(false);
    } catch (error) {
        setLoader(false);
        setErrorMessage(isErrorDispaly(error));
    }
};
const clearMessage=()=>{
    setErrorMessage(null) 
}


  return (
    <div>
        <div>
        <DrawerPlacement  openDrawer={openDrawer} closeDrawer={closeDrawer} data={person} loader={loader} errorMessage={errorMessage} clearMessage={clearMessage}/>
          
        </div>
      
    </div>
  );
};

export default ViewPerson;
