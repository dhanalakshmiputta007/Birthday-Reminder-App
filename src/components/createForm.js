import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/all.css';
import { useNavigate, useParams } from 'react-router-dom';
import { validationSchema } from '../utils/validationMessages';
import { isErrorDispaly } from './api';

const AddPerson = ({ }) => {
    const [image, setImage] = useState('');
    const { id } = useParams();
    const [initialState, setInitialState] = useState({ name: '', photo: '', date: null, email: "" })
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const [message, setMessage] = useState(''); // Display success or error messages
    useEffect(() => {
        if (id) {
            getPersonById(id);
        }
    }, [])
    const getPersonById = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/api/people/${id}`);
            setInitialState(response.data);
            setImage(response.data.photo)
        } catch (error) {
            setMessage(isErrorDispaly(error));
        }
    };
    const handleImageUpload = async (e, setFieldValue) => {
        const file = e.target.files[0];
        if (!file) {
            setMessage('Please select an image first.');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFieldValue('photo', response.data.imageUrl)
            setImage(response.data.imageUrl);
            setMessage('File uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading file');
        }
    };
    const handleFormSubmit = (values, { setSubmitting }) => {
        const apiEndpoint = id ? `${apiUrl}/api/people/${id}` : `${apiUrl}/api/people`;
        const method = id ? 'put' : 'post';

        axios[method](apiEndpoint, values)
            .then(response => {
                navigate('/');
                setMessage(null)
            })
            .catch(error => {
                setMessage(isErrorDispaly(error))
            })
            .finally(() => setSubmitting(false));
    };
    return (
        <div className="form-container">
            <h2>{id ? 'Edit Person' : 'Add New Person'}</h2>

            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                enableReinitialize={true} // This is crucial for updating form with fetched data
                onSubmit={handleFormSubmit}
            >
                {({ setFieldValue, values, touched, errors, isSubmitting }) => (
                    <Form>
                        <label className='lable-name'>Name</label>
                        <Field className='form-input'
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                        />
                        <ErrorMessage name="name" component="div" className="error-message" />
                        <label className='lable-name'>Email</label>
                        <Field
                            className='form-input'
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                        />
                        <ErrorMessage name="email" component="div" className="error-message" />
                        <label className="lable-name">Mobile Number</label>
                        <Field
                            className="form-input"
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter Mobile Number"
                        />
                        <ErrorMessage name="phoneNumber" component="div" className="error-message" />

                        <label className='lable-name'>Upload Photo (URL)</label>
                        <input
                            className='form-input'
                            type="file"
                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                            accept="image/*"
                        />
                        {image && <img src={image} alt="Uploaded Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                        <ErrorMessage name="photo" component="div" className="error-message" />
                        <div>
                            <label className='lable-name'>Birthday Date</label>

                            <DatePicker
                                value={values.date ? new Date(values.date) : null} // Use value instead of selected
                                onChange={(event) => setFieldValue('date', event?.value)} // event.value gives the selected date
                                format="dd/MM/yyyy" // Date format
                                placeholder="Select Birthday"
                            />
                            <ErrorMessage name="date" component="div" className="error-message" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="button">
                            {id ? 'Update Person' : 'Add Person'}
                        </button>          </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPerson;
