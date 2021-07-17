import React from "react";
import styles from "./MainBody.module.scss";
import Image from "next/image";
function MainContent(props) {
  const posts = props.posts.posts;
  let listOfContents = [...posts];
  listOfContents.splice(0, 3);
  console.log(listOfContents);
  const renderListOfContents = () => {
    return listOfContents.map((item) => {
      return (
        <div key={item._id} className={styles.itemContent}>
          <div>
            <Image
              className={styles.imageCover}
              src={item.image}
              width="210"
              height="112"
              alt={item.title}
            />
          </div>
          <div>
            <h3 className={styles.titleContent}>{item.title}</h3>
            <small className={styles.smallCategory}>{item.category.name}</small>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.listOfContent}>{renderListOfContents()}</div>
      <div className={styles.mostPopular}></div>
    </div>
  );
}

export default MainContent;
