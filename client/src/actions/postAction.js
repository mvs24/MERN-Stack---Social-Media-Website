import axios from "axios";
import { GET_POSTS_USER, POST_ERROR, GET_POSTS, GET_POST } from "./types";

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

export const addComment = (data, postId) => dispatch => {
  axios
    .post("/api/posts/comment/" + postId, data)
    .then(res => dispatch(fetchPosts()))
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};

export const addLikeToComment = postId => dispatch => {
  axios
    .post(`/api/posts/post/like/${postId}`)
    .then(res => {
      dispatch(fetchPosts());
    })
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};

export const findPostById = id => dispatch => {
  console.log(id)
  axios
    .get("/api/posts/post/" + id)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: POST_ERROR,
        payload: err.response.data
      })
    );
};
