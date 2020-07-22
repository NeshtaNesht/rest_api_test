import { homeTypes } from "./constants";

const initialState = {
  users: null,
  posts: null,
  appTitle: "",
  token: "",
  notification: {
    visibility: false,
    type: "",
    message: "",
  },
  fetch: false,
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
  [homeTypes.FETCH]: (state, payload) => {
    return {
      ...state,
      fetch: payload,
    };
  },
  DEFAULT: (state) => state,
};

export const homeReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
