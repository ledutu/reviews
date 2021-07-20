import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import { fetchPostByID } from "../../store/actions/postAction";
import styles from "./Post.module.scss";
function Post({ router }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.post);
  const { id } = router.query;
  useEffect(() => {
    if (!post._id && id) {
      // get content from API
      dispatch(fetchPostByID(id));
    }
  }, [id]);

  return (
    <div className={styles.postContent}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default withRouter(Post);
