import * as types from "../../types";
//import axios from "axios";

export const fetchPosts = () => async (dispatch) => {
  //const res = await axios.get("url/api");
  dispatch({
    type: types.GET_POSTS,
    payload: ["Post Number 1", "Post Number 2", "Post Number 3"],
  });
};
