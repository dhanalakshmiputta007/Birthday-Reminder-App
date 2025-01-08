import * as Yup from 'yup'; // For validation

export const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    // photo: Yup.string()
    //   .url('Please enter a valid URL for the photo')
    //   .required('Photo is required'),
    date: Yup.date().required('Birthday date is required').nullable(),
  });