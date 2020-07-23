import { cardTypes } from "./constants";

const initialState = {
  activeCard: null,
  userPosts: [],
  postComments: [],
  fetch: false,
};

const handlers = {
  [cardTypes.SET_ACTIVE_CARD]: (state, payload) => {
    return {
      ...state,
      activeCard: payload,
    };
  },
  [cardTypes.SET_CURRENT_USER_POSTS]: (state, payload) => {
    return {
      ...state,
      userPosts: payload,
    };
  },
  [cardTypes.SET_CURRENT_POST_COMMENTS]: (state, payload) => {
    return {
      ...state,
      postComments: payload,
    };
  },
  [cardTypes.FETCH_USER_POSTS]: (state, payload) => {
    return {
      ...state,
      fetch: true,
    };
  },
  [cardTypes.FETCH_COMMENTS_POST]: (state, payload) => {
    return {
      ...state,
      fetch: true,
    };
  },
  [cardTypes.FETCH_END]: (state, payload) => {
    return {
      ...state,
      fetch: false,
    };
  },
  DEFAULT: (state) => state,
};

export const cardReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
