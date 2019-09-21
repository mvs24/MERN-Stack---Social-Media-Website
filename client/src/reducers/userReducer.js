import { GET_ERRORS, SET_CURRENT_USER, LOGIN_ERROR, SEARCHED_USER, USER, USER_POST } from "../actions/types";

const initialState = {
  errors: {},
  loginError: {},
  user: null,
  searchedUser: null
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
    case SEARCHED_USER:
      return {
        ...state,
        searchedUser: action.payload
      }
    case USER:
      return {
        ...state,
        userSearched: action.payload
      }
    case USER_POST:
      return {
        ...state,
        userSearchedPosts: action.payload
      }
    default:
      return state;
  }
}
