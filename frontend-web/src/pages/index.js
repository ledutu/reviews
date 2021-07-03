import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../scss/Home.module.scss";
import { fetchPosts } from "./../store/actions/postAction";
import Header from "./../containers/home/header";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(fetchPosts());
    return () => {};
  }, []);

  return (
    <>
      <div id="carousel">
        <div className="wrapper">
          <div className="container">
            <h3>Every Review is an Experience!</h3>
            <p>Check Ratings of Businesses, Read Reviews &amp; Buy</p>
          </div>
        </div>
      </div>
    </>
  );
}
