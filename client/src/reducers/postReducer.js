import { GET_POSTS_USER, POST_ERROR, GET_POSTS, GET_POST } from "../actions/types";
const initialState = {
  postsUser: null,
  error: null,
  allPosts: [],
  clickedPost: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_USER:
      return {
        ...state,
        postsUser: action.payload
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload
      };
    case GET_POST: 
     return {
      ...state,
      clickedPost: action.payload
     }
    default:
      return state;
  }
};
