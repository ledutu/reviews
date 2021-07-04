import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../store/actions/postAction";

export default function Categories() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  useEffect(() => {
    dispatch(fetchPosts());
    return () => {};
  }, []);
  console.log(posts);
  return (
    <div id="categories">
      <div className="categories_wrapper">
        <h3 className="categories_title">Top Categories</h3>
        <div className="top_categories">
          {posts &&
            posts.map((item) => (
              <div className="category" key={item}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  width="320px"
                  height="180px"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
