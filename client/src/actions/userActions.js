import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, LOGIN_ERROR } from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const signUpUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => {
      history.push("/signIn");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login get user token
export const signInUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
     
      let { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set token to auth header --> function built in utils folder
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      history.push("/home");
    })
    .catch(err =>
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// export const signOutUser = history => dispatch => {
//   // remove token from LS
//   localStorage.removeItem("jwtToken");
//   setAuthToken(false);
//   history.push("/");
//   dispatch({
//     type: SET_CURRENT_USER,
//     payload: {}
//   });
// };
