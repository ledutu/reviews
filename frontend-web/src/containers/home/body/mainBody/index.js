import React from "react";
import styles from "./MainBody.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { pushPostToStore } from "../../../../store/actions/postAction";
import SideBar from "../../../../components/sidebar";
function MainContent(props) {
  const dispatch = useDispatch();
  const posts = props.posts.posts;
  let listOfContents = [...posts];
  listOfContents.splice(0, 3);

  const handleClickLink = (item) => {
    dispatch(pushPostToStore(item));
  };
  const renderListOfContents = () => {
    return listOfContents.map((item) => {
      return (
        <div key={item._id} className={styles.itemContent}>
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
                width="210"
                height="112"
                alt={item.title}
              />
            </div>
          </Link>
          <div>
            <Link
              href={{
                pathname: `/post`,
                query: { id: item._id },
              }}
            >
              <h3
                onClick={() => {
                  handleClickLink(item);
                }}
                className={styles.titleContent}
              >
                {item.title}
              </h3>
            </Link>
            <small className={styles.smallCategory}>{item.category.name}</small>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.listOfContent}>{renderListOfContents()}</div>
      <SideBar />
    </div>
  );
}

export default MainContent;
