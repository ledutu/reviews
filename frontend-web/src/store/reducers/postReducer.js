import * as types from "../types";
const initialState = {
  posts: [],
  post: {},
  loading: false,
  err: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        err: null,
      };
    case types.GET_POST_BY_ID:
      return {
        ...state,
        post: action.payload,
        loading: false,
        err: null,
      };
    case types.PUSH_POST_TO_STORE:
      return {
        ...state,
        post: action.payload,
        loading: false,
        err: null,
      };

    default:
      return state;
  }
};
