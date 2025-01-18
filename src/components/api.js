export const isErrorDispaly = (objValue) => {
     if (objValue?.response?.status == 400){
      if (objValue?.response?.data?.error?.validationErrors && objValue?.response?.data?.error?.validationErrors.length > 0 && objValue?.response?.data?.error?.validationErrors[0]?.message && typeof objValue?.response?.data?.error?.validationErrors[0]?.message === 'string') {
        return objValue?.response?.data?.error?.validationErrors[0].message;
      }else if(objValue?.response?.data?.error_description && typeof objValue?.response?.data?.error_description==='string'){
        return objValue?.response?.data?.error_description
      }
      return 'Somthing went wrong, Please contact Administrator!';
    }
    else if(objValue?.response?.status === 404){
      return 'Service not avaliable';
    }
    else{
      return 'Something went wrong.';
    }
  
  };