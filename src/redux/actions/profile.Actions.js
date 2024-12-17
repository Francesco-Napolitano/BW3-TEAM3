const apiKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxNDBiMjc0YTg2ODAwMTVkYjU1MWMiLCJpYXQiOjE3MzQ0MjY4MDIsImV4cCI6MTczNTYzNjQwMn0.MS-obKVdz_9WWgFftg0o7Pt3P7U7ZMWSwQoDqqFx-4k";

// Funzione per il request del profilo
const getProfileRequest = () => ({
  type: "GET_PROFILE_REQUEST",
  error: null,
  loading: true,
});

// Funzione per il successo della richiesta di profilo
const getProfileSuccess = (profile) => ({
  type: "GET_PROFILE_SUCCESS",
  payload: profile,
  error: null,
  loading: false,
});

// Funzione per la gestione dell'errore nella richiesta del profilo
const getProfileFailure = (error) => ({
  type: "GET_PROFILE_FAILURE",
  error: error,
  loading: false,
});

// Funzione per il request dei profili
const getProfilesRequest = () => ({
  type: "GET_PROFILES_REQUEST",
  error: null,
  loading: true,
});

// Funzione per il successo della richiesta dei profili
const getProfilesSuccess = (profiles) => ({
  type: "GET_PROFILES_SUCCESS",
  payload: profiles,
  error: null,
  loading: false,
});

// Funzione per il successo nel recupero del proprio profilo
const getMyProfileSuccess = (profile) => ({
  type: "GET_MY_PROFILE_SUCCESS",
  payload: profile,
  error: null,
  loading: false,
});

// Funzione per il fallimento nella richiesta dei profili
const getProfilesFailure = (error) => ({
  type: "GET_PROFILES_FAILURE",
  error: error,
  loading: false,
});

// Funzione per il request di modifica del profilo
const editProfileRequest = () => ({
  type: "EDIT_PROFILE_REQUEST",
  error: null,
  loading: true,
});

// Funzione per il successo nella modifica del profilo
const editProfileSuccess = (profile) => ({
  type: "EDIT_PROFILE_SUCCESS",
  payload: profile,
  error: null,
  loading: false,
});

// Funzione per il fallimento nella modifica del profilo
const editProfileFailure = (error) => ({
  type: "EDIT_PROFILE_FAILURE",
  error: error,
  loading: false,
});

// Azione per ottenere il profilo dell'utente
export const fetchMyProfile = () => {
  return async (dispatch) => {
    dispatch(getProfileRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profile = await response.json();
      dispatch(getMyProfileSuccess(profile));
      console.log("nella fetch:", profile);
    } catch (error) {
      dispatch(getProfileFailure(error.message || "Please log in"));
    }
  };
};

// Azione per ottenere il profilo di un altro utente
export const fetchProfile = (userId) => {
  return async (dispatch) => {
    dispatch(getProfileRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profile = await response.json();
      dispatch(getProfileSuccess(profile));
      console.log("nella fetch:", profile);
    } catch (error) {
      dispatch(getProfileFailure(error.message || "An unknown error occurred"));
    }
  };
};

// Azione per ottenere tutti i profili
export const fetchProfiles = () => {
  return async (dispatch) => {
    dispatch(getProfilesRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profiles = await response.json();
      dispatch(getProfilesSuccess(profiles));
      console.log("nella fetch:", profiles);
    } catch (error) {
      dispatch(getProfilesFailure(error.message || "An unknown error occurred"));
    }
  };
};

// Azione per modificare il profilo
export const editProfile = (new_profile) => {
  return async (dispatch) => {
    dispatch(editProfileRequest());

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_profile),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const profile = await response.json();
      dispatch(editProfileSuccess(profile));
      console.log("nella fetch:", profile);
    } catch (error) {
      dispatch(editProfileFailure(error.message || "An unknown error occurred"));
    }
  };
};
