import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import { fetchPostByID } from "../../store/actions/postAction";
import styles from "./Post.module.scss";
import Head from "next/head";
import SideBar from "../../components/sidebar";
import renderHTML from "react-render-html";
import Image from "next/image";
//import tinymce from "tinymce";

function Post({ router }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.post);
  const { id } = router.query;
  useEffect(() => {
    if (!post._id && id) {
      // get content from API
      dispatch(fetchPostByID(id));
    }
    // tinymce.init({
    //   selector: `#contentID`,
    //   content_css: "content.scss",
    // });
    handlerHTML();
  }, [id, post]);

  const handlerHTML = () => {
    var a = document.getElementById("contentID");
    if (!a) return;
    //a.innerHTML = post.content;
    var b = a.querySelectorAll("img");
    b.forEach((ele) => {
      return (ele.style.width = "720px"), (ele.style.marginLeft = "15px");
    });
  };
  if (!post.content) return <p>Loading...!</p>;

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
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default withRouter(Post);
