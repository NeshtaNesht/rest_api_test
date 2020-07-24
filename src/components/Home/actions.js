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

// Установка токена
export const setToken = (token) => {
  return {
    type: homeTypes.SET_TOKEN,
    payload: token,
  };
};

// Установка notification
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

// Action-creator начала запроса
export const fetchStarted = () => {
  return {
    type: homeTypes.FETCH_START,
  };
};

// Action-creator окончания запроса
export const fetchEnded = () => {
  return {
    type: homeTypes.FETCH_END,
  };
};

// Установка пользователя
export const setUsers = (data) => {
  return {
    type: homeTypes.SET_USERS,
    payload: data,
  };
};

// Установка постов
export const setPosts = (data) => {
  return {
    type: homeTypes.SET_POSTS,
    payload: data,
  };
};

// Установка активного таба (в данном случае кнопки)
export const setActiveTab = (nameTab) => ({
  type: homeTypes.SET_ACTIVE_TAB,
  payload: nameTab,
});

// Запрос на получение списка пользователей
export const fetchGetUsers = (pageNumber = 0) => {
  return (dispatch) => {
    // Запрос начался
    dispatch(fetchStarted());
    // Делаем гет запрос
    axios({
      method: "GET",
      url: `https://gorest.co.in/public-api/users?page=${pageNumber}&access-token=${
        store.getState().homeReducer.token
      }`,
    })
      .then((res) => {
        if (res.data._meta.success === false) {
          // Если от сервера что-то не то пришло, вываливаем ошибку
          dispatch(
            setNotification(
              "error",
              `Users fail: ${res.data._meta.code} ${res.data._meta.message}`,
              true
            )
          );
        } else if (res.data._meta.success) {
          dispatch(setNotification("success", `Пользователи загружены`, true));
          dispatch(setUsers(res.data));
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(setNotification("error", e, true));
      })
      .finally(() => {
        dispatch(fetchEnded());
      });
  };
};
export const fetchGetPosts = (pageNumber) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    axios({
      method: "GET",
      url: `https://gorest.co.in/public-api/posts?page=${pageNumber}&access-token=${
        store.getState().homeReducer.token
      }`,
    })
      .then((res) => {
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
          dispatch(setPosts(res.data));
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(setNotification("error", e, true));
      })
      .finally(() => {
        dispatch(fetchEnded());
      });
  };
};

export const fetchPostPost = (data) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    axios({
      method: "POST",
      url: `https://gorest.co.in/public-api/posts?access-token=${
        store.getState().homeReducer.token
      }`,
      data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(fetchEnded());
      });
  };
};
