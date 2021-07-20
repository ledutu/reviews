import React from "react";
import Image from "next/image";
import styles from "./TopBody.module.scss";
import Link from "next/link";
import { pushPostToStore } from "../../../../store/actions/postAction";
import { useDispatch } from "react-redux";
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
        <div key={item._id}>
          <Link
            href={{
              pathname: `/post`,
              query: { id: item._id },
            }}
          >
            <div
              className={styles.wrapperImage}
              onClick={() => {
                handleClickLink(item);
              }}
            >
              <Image
                className={styles.imageCover}
                src={item.image}
                width="300"
                height="160"
                alt="newestContent"
              />
            </div>
          </Link>
          <h3 className={styles.title}>{item.title}</h3>
        </div>
      );
    });
  };

  const handleClickLink = (item) => {
    dispatch(pushPostToStore(item));
  };

  return (
    <div id="topContent" className={styles.topContent}>
      <div className={styles.bigContent}>
        <div className={styles.wrapper}>
          <Link
            href={{
              pathname: `/post`,
              query: { id: posts[0]._id },
            }}
          >
            <div
              onClick={() => {
                handleClickLink(posts[0]);
              }}
            >
              <Image
                className={styles.imageCover}
                src={posts[0].image}
                width="720"
                height="405"
                alt="newestContent"
              />
            </div>
          </Link>
          <div className={styles.bigContentTitle}>
            <h2 className={styles.title}>{posts[0].title}</h2>
          </div>
        </div>
      </div>
      <div className={styles.subContent}>{renderSubContent()}</div>
    </div>
  );
}

export default TopContent;
