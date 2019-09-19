import axios from "axios";
import { GET_POSTS_USER, POST_ERROR, GET_POSTS } from "./types";

export const getPostsUser = id => dispatch => {
  axios
    .get("/api/posts/" + id)
    .then(res =>
      dispatch({
        type: GET_POSTS_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};

export const fetchPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};

export const addPost = value => dispatch => {
  axios
    .post("/api/posts", value)
    .then(res => dispatch(fetchPosts()))
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};
