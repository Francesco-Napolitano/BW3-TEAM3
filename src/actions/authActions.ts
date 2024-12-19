import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any; // Il token o i dati utente ottenuti dalla risposta
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string; // Messaggio di errore
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

export const login  =() => {
  (email: string, password: string): ThunkAction<void, RootState, unknown, AuthAction> =>
    async (dispatch) => {
      try {
        dispatch({ type: LOGIN_REQUEST });
  
        // Verifica le credenziali contro un account hardcoded
        if (email === "matteo.dilorenzo99@outlook.it" && password === "Parmenide1!") {
          // Usa il token predefinito per il login
          console.log("ciao sono qui")
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMjkwOTBlYTI4NjAwMTUyOGI5NjUiLCJpYXQiOjE3MzQzNTUyMTAsImV4cCI6MTczNTU2NDgxMH0.kNzj5TqZfyb3D7yaA1EKtcLStc0Dm__oimsZadyASgA";
  
          // Esegui la richiesta GET per ottenere il profilo dell'utente
          const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/profile/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error("Errore nel recupero del profilo!");
          }
  
          const data = await response.json();
          const navigate = useNavigate();
          navigate("/")
          dispatch({ type: LOGIN_SUCCESS, payload: data });
  
          // Redirect al successo
          
        } else {
          throw new Error("Credenziali non valide!");
        }
      } catch (error: any) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        console.error("Errore durante il login:", error.message);
      }
    };
  
}
  