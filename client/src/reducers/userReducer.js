import { GET_ERRORS, SET_CURRENT_USER, LOGIN_ERROR } from "../actions/types";

const initialState = {
  errors: {},
  loginError: {},
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
      case SET_CURRENT_USER:
        return {
            ...state,
            user: action.payload
        }
      case LOGIN_ERROR: 
      return {
        ...state,
        loginError: action.payload
      }
    default:
      return state;
  }
}
