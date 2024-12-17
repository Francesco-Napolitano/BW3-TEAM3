const initialState = {
    loading: true,
    error: null,
  };
  
  const feedReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_IMAGE_PROFILE_REQUEST":
      case "ADD_IMAGE_EXPERIENCE_REQUEST":
      case "ADD_IMAGE_POST_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case "ADD_IMAGE_PROFILE_SUCCESS":
      case "ADD_IMAGE_EXPERIENCE_SUCCESS":
      case "ADD_IMAGE_POST_SUCCESS":
        return {
          ...state,
          loading: false,
        };
  
      case "ADD_IMAGE_PROFILE_FAILURE":
      case "ADD_IMAGE_EXPERIENCE_FAILURE":
      case "ADD_IMAGE_POST_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default feedReducer;
  
