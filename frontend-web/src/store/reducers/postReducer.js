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

    default:
      return state;
  }
};
