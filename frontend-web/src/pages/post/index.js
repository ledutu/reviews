import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import { fetchPostByID } from "../../store/actions/postAction";
import styles from "./Post.module.scss";
import Head from "next/head";
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
    renderHTML();
  }, [id]);

  const renderHTML = () => {
    // ReactDOM.render(, document.getElementById("contentID"));
    var a = document.getElementById("contentID");
    a.innerHTML = post.content;
    var b = document.getElementById("contentID").querySelectorAll("img");
    b.forEach((ele) => {
      return (ele.style.width = "720px"), (ele.style.marginLeft = "15px");
    });
  };

  return (
    <>
      <Head></Head>
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <div id="contentID" className={styles.content}></div>
      </div>
    </>
  );
}

export default withRouter(Post);
