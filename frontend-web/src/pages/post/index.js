import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import { fetchPostByID } from "../../store/actions/postAction";
import styles from "./Post.module.scss";
import Head from "next/head";
import renderHTML from "react-render-html";
import Image from "next/image";
import { SideBar } from "../../components";
import axios from "../../store";

function Post({ router }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.post);
  const { id } = router.query;
  const [reviewLatest, setreviewLatest] = useState([]);
  const [isLatestLoading, setIsLatestLoading] = useState(true);

  useEffect(() => {
    if (!post._id && id) {
      // get content from API
      dispatch(fetchPostByID(id));
    }
    handlerHTML();
  }, [id, post]);

  useEffect(() => {
    getLatestReview();
  }, []);

  const getLatestReview = async () => {
    try {
      setIsLatestLoading(true);
      const response = await axios.get('/review/latest?limit=4');
      setreviewLatest(response.data);  
      setIsLatestLoading(false);
    } catch (error) {
      setIsLatestLoading(false);
    }
  }

  const handlerHTML = () => {
    var a = document.getElementById("contentID");
    if (!a) return;
    //a.innerHTML = post.content;
    var b = a.querySelectorAll("img");
    b.forEach((ele) => {
      return (
        (ele.style.width = "720px"),
        (ele.style.height = "405px"),
        (ele.style.marginLeft = "2.5px")
      );
    });
  };
  if (!post.content) return <p>Loading...!</p>;
  
  const handleOnItemClick = item => {
    console.log(item);
  }

  return (
    <>
      <Head></Head>
      <div className={styles.wrapperPostDetail}>
        <div className={styles.postContent}>
          <Image
            width="720px"
            height="405px"
            src={"http://api.reviewduthu.vn" + post.image}
            alt={post.title}
          />
          <h2>{post.title}</h2>
          <div id="contentID" className={styles.content}>
            {renderHTML(post.content)}
          </div>
        </div>
        <div className={styles.postSideBar}>
          <SideBar
            data={reviewLatest}
            title="Bài viết gần đây"
            onItemClick={handleOnItemClick}
            isLoading={isLatestLoading}
          />
        </div>
      </div>
    </>
  );
}

export default withRouter(Post);
