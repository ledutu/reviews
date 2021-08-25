import React from "react";
import Image from "next/image";
import styles from "./TopBody.module.scss";
import Link from "next/link";
import { pushPostToStore } from "../../../../store/actions/postAction";
import { useDispatch } from "react-redux";
import BigContent from "./components/bigContent";
import SubContent from "./components/subContent";
function TopContent(props) {
  const dispatch = useDispatch();
  let posts = props.posts.posts;
  if (!posts) return null;

  const renderSubContent = () => {
    var arr = [];
    arr.push(posts[1]);
    arr.push(posts[2]);
    if (!posts) {
      return null;
    }

    return arr.map((item) => {
      return (
        <SubContent
          key={item._id}
          item={item}
          styles={styles}
          handleClickLink={handleClickLink}
        />
      );
    });
  };

  const handleClickLink = (item) => {
    dispatch(pushPostToStore(item));
  };

  return (
    <div id="topContent" className={styles.topContent}>
      <BigContent
        handleClickLink={handleClickLink}
        post={posts[0]}
        styles={styles}
      />
      <div className={styles.subContent}>{renderSubContent()}</div>
    </div>
  );
}

export default TopContent;
