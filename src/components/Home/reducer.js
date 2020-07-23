import { homeTypes } from "./constants";
import { TextareaAutosize } from "@material-ui/core";

const initialState = {
  users: null,
  posts: null,
  appTitle: "",
  token:
    process.env.NODE_ENV === "development"
      ? "iS8-UL8EgjPwjFyauK4ne97NhXG5fCoZnyhS"
      : "",
  notification: {
    visibility: false,
    type: "",
    message: "",
  },
  fetch: false,
  activeTab: null,
};

const handlers = {
  [homeTypes.SET_USERS]: (state, payload) => {
    return {
      ...state,
      users: payload,
    };
  },
  [homeTypes.SET_POSTS]: (state, payload) => {
    return {
      ...state,
      posts: payload,
    };
  },
  [homeTypes.SET_TITLE]: (state, payload) => {
    return {
      ...state,
      appTitle: payload,
    };
  },
  [homeTypes.SET_TOKEN]: (state, payload) => {
    return {
      ...state,
      token: payload,
    };
  },
  [homeTypes.SET_NOTIFICATION]: (state, payload) => {
    return {
      ...state,
      notification: payload,
    };
  },
  [homeTypes.FETCH_START]: (state, payload) => {
    return {
      ...state,
      fetch: true,
    };
  },
  [homeTypes.FETCH_END]: (state, payload) => {
    return {
      ...state,
      fetch: false,
    };
  },
  [homeTypes.SET_ACTIVE_TAB]: (state, payload) => {
    return {
      ...state,
      activeTab: payload,
    };
  },
  DEFAULT: (state) => state,
};

export const homeReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
