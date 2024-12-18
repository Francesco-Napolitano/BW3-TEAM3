const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZWEzYTBlYTI4NjAwMTUyOGI5MmUiLCJpYXQiOjE3MzQzMzkxMzEsImV4cCI6MTczNTU0ODczMX0._KemmCFCgbb9RJTBhKl-yp_SxkrBxlhDZviQyL2goDE";

// Action creators per gestire lo stato delle richieste di immagine
const addImageProfileRequest = () => ({
  type: "ADD_IMAGE_PROFILE_REQUEST",
  loading: true,
  error: null,
});

const addImageProfileSuccess = () => ({
  type: "ADD_IMAGE_PROFILE_SUCCESS",
  loading: false,
  error: null,
});

const addImageProfileFailure = (error) => ({
  type: "ADD_IMAGE_PROFILE_FAILURE",
  loading: false,
  payload: error,
});

const addImageExperienceRequest = () => ({
  type: "ADD_IMAGE_EXPERIENCE_REQUEST",
  loading: true,
  error: null,
});

const addImageExperienceSuccess = () => ({
  type: "ADD_IMAGE_EXPERIENCE_SUCCESS",
  loading: false,
  error: null,
});

const addImageExperienceFailure = (error) => ({
  type: "ADD_IMAGE_EXPERIENCE_FAILURE",
  loading: false,
  payload: error,
});

const addImagePostRequest = () => ({
  type: "ADD_IMAGE_POST_REQUEST",
  loading: true,
  error: null,
});

const addImagePostSuccess = () => ({
  type: "ADD_IMAGE_POST_SUCCESS",
  loading: false,
  error: null,
});

const addImagePostFailure = (error) => ({
  type: "ADD_IMAGE_POST_FAILURE",
  loading: false,
  payload: error,
});

// Azione per aggiungere un'immagine al profilo
export const addImageProfile = (userId, image) => {
  return async (dispatch) => {
    dispatch(addImageProfileRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/picture`,
        {
          method: "POST",
          body: image,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      dispatch(addImageProfileSuccess());
    } catch (error) {
      dispatch(addImageProfileFailure(error.message || "An unknown error occurred"));
    }
  };
};

// Azione per aggiungere un'immagine a un'esperienza
export const addImageExperience = (userId, expId, image) => {
  return async (dispatch) => {
    dispatch(addImageExperienceRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}/picture`,
        {
          method: "POST",
          body: image,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      dispatch(addImageExperienceSuccess());
    } catch (error) {
      dispatch(addImageExperienceFailure(error.message || "An unknown error occurred"));
    }
  };
};

// Azione per aggiungere un'immagine a un post
export const addImagePost = (postId, image) => {
  return async (dispatch) => {
    dispatch(addImagePostRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
        {
          method: "POST",
          body: image,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      dispatch(addImagePostSuccess());
    } catch (error) {
      dispatch(addImagePostFailure(error.message || "An unknown error occurred"));
    }
  };
};