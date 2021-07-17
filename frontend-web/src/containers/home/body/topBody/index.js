import React from "react";
import Image from "next/image";
import styles from "./TopBody.module.scss";
function TopContent(props) {
  let posts = props.posts.posts;
  console.log(posts);
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
          <Image
            className={styles.imageCover}
            src={item.image}
            width="300"
            height="160"
            alt="newestContent"
          />
          <h3 className={styles.title}>{item.title}</h3>
        </div>
      );
    });
  };

  return (
    <div id="topContent" className={styles.topContent}>
      <div className={styles.bigContent}>
        <div className={styles.wrapper}>
          <Image
            className={styles.imageCover}
            src={posts[0].image}
            width="720"
            height="405"
            alt="newestContent"
          />
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
