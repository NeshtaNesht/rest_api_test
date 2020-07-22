import { homeTypes } from "./constants";
import store from "../../store";
import axios from "axios";

// Смена заголовка
export const setTitle = (title) => {
  return {
    type: homeTypes.SET_TITLE,
    payload: title,
  };
};

export const setToken = (token) => {
  return {
    type: homeTypes.SET_TOKEN,
    payload: token,
  };
};

export const setNotification = (type, message, visibility) => {
  return {
    type: homeTypes.SET_NOTIFICATION,
    payload: {
      type,
      message,
      visibility,
    },
  };
};

export const setFetch = () => {
  return {
    type: homeTypes.FETCH,
    payload: !store.getState().homeReducer.fetch,
  };
};

export const setUsers = (data) => {
  return {
    type: homeTypes.SET_USERS,
    payload: data,
  };
};

export const setPosts = (data) => {
  return {
    type: homeTypes.SET_POSTS,
    payload: data,
  };
};

export const getData = () => {
  return (dispatch) => {
    try {
      dispatch(setFetch());
      fetchUsers(dispatch);
      fetchPosts(dispatch);
    } finally {
      dispatch(setFetch());
    }
  };
};

const fetchUsers = (dispatch) => {
  axios({
    method: "GET",
    url: `https://gorest.co.in/public-api/users?access-token=${
      store.getState().homeReducer.token
    }`,
  })
    .then((res) => {
      console.log(res);
      if (res.data._meta.success === false) {
        dispatch(
          setNotification(
            "error",
            `Users fail: ${res.data._meta.code} ${res.data._meta.message}`,
            true
          )
        );
      } else if (res.data._meta.success) {
        dispatch(setNotification("success", `Пользователи загружены`, true));
        dispatch(setUsers(res.data.result));
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch(setNotification("error", e, true));
    });
};
const fetchPosts = (dispatch) => {
  axios({
    method: "GET",
    url: `https://gorest.co.in/public-api/posts?access-token=${
      store.getState().homeReducer.token
    }`,
  })
    .then((res) => {
      console.log(res);
      if (res.data._meta.success === false) {
        dispatch(
          setNotification(
            "error",
            `Posts fail: ${res.data._meta.code} ${res.data._meta.message}`,
            true
          )
        );
      } else if (res.data._meta.success) {
        dispatch(setNotification("success", `Посты загружены`, true));
        dispatch(setPosts(res.data.result));
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch(setNotification("error", e, true));
    });
};
