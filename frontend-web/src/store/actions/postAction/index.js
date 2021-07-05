import * as types from "../../types";
//import axios from "axios";
import cars from "./../../../assets/categories/category_cars_2.jpg";
import trip from "./../../../assets/categories/category_trip_2.jpg";
import food from "./../../../assets/categories/category_food_2.jpg";

import technology from "./../../../assets/categories/category_technology_2.jpg";
import fashion from "./../../../assets/categories/category_fashion_2.jpg";
import coffee from "./../../../assets/categories/category_coffee_3.jpg";
export const fetchPosts = () => async (dispatch) => {
  //const res = await axios.get("url/api");
  dispatch({
    type: types.GET_POSTS,
    payload: [
      { title: "Fashion", alt: "category_5", img: fashion },
      { title: "Cars", alt: "category_1", img: cars },
      { title: "Technology", alt: "category_4", img: technology },
      { title: "Coffee", alt: "category_6", img: coffee },
      { title: "Trip", alt: "category_2", img: trip },
      { title: "Food", alt: "category_3", img: food },
    ],
  });
};
