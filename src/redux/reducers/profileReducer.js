const initialState = {
    list: [],
    selected: null,
    me: null,
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PROFILE_REQUEST":
      case "GET_PROFILES_REQUEST":
      case "EDIT_PROFILE_REQUEST":
        return {
          ...state,
          error: null,
          loading: true,
        };
      case "GET_PROFILE_FAILURE":
      case "GET_PROFILES_FAILURE":
      case "EDIT_PROFILE_FAILURE":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case "GET_PROFILE_SUCCESS":
        return {
          ...state,
          selected: action.payload,
          error: null,
          loading: false,
        };
      case "GET_MY_PROFILE_SUCCESS":
        return {
          ...state,
          me: action.payload,
          error: null,
          loading: false,
        };
      case "GET_PROFILES_SUCCESS":
        return {
          ...state,
          list: action.payload,
          error: null,
          loading: false,
        };
      case "EDIT_PROFILE_SUCCESS":
        return {
          ...state,
          selected: action.payload,
          error: null,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  