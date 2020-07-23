import { cardTypes } from "./constants";
import axios from "axios";
import store from "../../store";

export const setCard = (obj) => ({
  type: cardTypes.SET_ACTIVE_CARD,
  payload: obj,
});

export const setUserPosts = (posts) => ({
  type: cardTypes.SET_CURRENT_USER_POSTS,
  payload: posts,
});

export const setPostComments = (comments) => ({
  type: cardTypes.SET_CURRENT_POST_COMMENTS,
  payload: comments,
});

export const fetchUserPostsStart = () => ({
  type: cardTypes.FETCH_USER_POSTS,
});

export const fetchUserPostsEnd = () => ({
  type: cardTypes.FETCH_END,
});

export const fetchPostsByUser = () => {
  return (dispatch) => {
    dispatch(fetchUserPostsStart());
    axios({
      method: "GET",
      url: `https://gorest.co.in/public-api/posts?user_id=${
        store.getState().cardReducer.activeCard.id
      }&_format=json&access-token=${store.getState().homeReducer.token}`,
    })
      .then((res) => {
        if (res.data._meta.success === false) {
          console.log(res.data._meta.success);
        } else if (res.data._meta.success) {
          dispatch(setUserPosts(res.data.result));
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(fetchUserPostsEnd());
      });
  };
};

export const fetchCommentsByPost = () => {
  return (dispatch) => {
    dispatch(fetchUserPostsStart());
    axios({
      method: "GET",
      url: `https://gorest.co.in/public-api/comments?post_id=${
        store.getState().cardReducer.activeCard.id
      }&_format=json&access-token=${store.getState().homeReducer.token}`,
    })
      .then((res) => {
        if (res.data._meta.success === false) {
          console.log(res.data._meta.success);
        } else if (res.data._meta.success) {
          dispatch(setPostComments(res.data.result));
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(fetchUserPostsEnd());
      });
  };
};
