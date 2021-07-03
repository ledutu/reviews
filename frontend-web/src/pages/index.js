import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import { fetchPosts } from "./../store/actions/postAction";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(fetchPosts());
    return () => {};
  }, []);

  return (
    <div>
      {posts &&
        posts.map((item) => {
          return <h1 key={item}>{item}</h1>;
        })}
    </div>
  );
}
