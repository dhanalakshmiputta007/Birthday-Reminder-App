const initialState = {
    people: [],
    loading: false,
    error: null,
  };
  
  // Define the actions
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_START':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, people: action.payload };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  