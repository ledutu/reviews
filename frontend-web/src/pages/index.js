import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../scss/Home.module.scss";
import { fetchPosts } from "./../store/actions/postAction";
import Header from "./../containers/home/header";
import Categories from "./../containers/home/categories";
export default function Home() {
  // const dispatch = useDispatch();
  // const { posts } = useSelector((state) => state.postReducer);
  // useEffect(() => {
  //   dispatch(fetchPosts());
  //   window.addEventListener("scroll", createEventListener);
  //   return () => {};
  // }, []);

  // const createEventListener = () => {
  //   var navbar = document.getElementById("header");
  //   console.log(window.pageYOffset);
  //   if (window.pageYOffset >= 1) {
  //     navbar.classList.add("sticky");
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }
  // };

  return (
    // <>
    //   <Head>
    //     <title>Web Reviews</title>
    //     <meta
    //       name="Keyword web reviews"
    //       content="review nồi cơm điện, review tivi, tủ lạnh...bla bla"
    //     />
    //   </Head>
    //   <Header />
    //   <div id="carousel">
    //     <div className="wrapper">
    //       <div className="container">
    //         <h1>Every Review is an Experience!</h1>
    //         <p>Check Ratings of Businesses, Read Reviews &amp; Buy</p>
    //       </div>
    //     </div>
    //   </div>
    //   <Categories />
    // </>
    <>
    <Head>
      <title>Review đủ thứ</title>
      <meta
        name="review đủ thứ"
        content="review đủ thứ"
      />
    </Head>
    <div>
      <h1>This is body</h1>
    </div>
    </>

  );
}
