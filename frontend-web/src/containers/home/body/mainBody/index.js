import React, { useEffect, useState } from "react";
import styles from "./MainBody.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { pushPostToStore } from "../../../../store/actions/postAction";
import { SideBar } from "../../../../components";
import { CONFIG } from "../../../../constants";
import axios from "../../../../store";

function MainContent(props) {
  const dispatch = useDispatch();
  const posts = props.posts.posts;
  let listOfContents = [...posts];
  listOfContents.splice(0, 3);
  const [reviewLatest, setreviewLatest] = useState([]);
  const [reviewRatest, setreviewRatest] = useState([]);
  const [isLatestLoading, setIsLatestLoading] = useState(true);
  const [isRatestLoading, setIsRatestLoading] = useState(true);

  const handleClickLink = (item) => {
    dispatch(pushPostToStore(item));
  };

  const handleOnItemLatestClick = (item) => {
    console.log(item);
  };

  const handleOnItemRatestClick = (item) => {
    console.log(item);
  };

  useEffect(() => {
    getLatestReview();
    getRatestReview();
  }, []);

  const getLatestReview = async () => {
    try {
      setIsLatestLoading(true);
      const response = await axios.get("/review/latest?limit=4");
      setreviewLatest(response.data);
      setIsLatestLoading(false);
    } catch (error) {
      setIsLatestLoading(false);
    }
  };

  const getRatestReview = async () => {
    try {
      setIsRatestLoading(true);
      const response = await axios.get("/review/ratest?limit=4");
      setreviewRatest(response.data);
      setIsRatestLoading(false);
    } catch (error) {
      setIsRatestLoading(false);
    }
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
            <a>
              <div
                className={styles.wrapperImage}
                onClick={() => {
                  handleClickLink(item);
                }}
              >
                <Image
                  className={styles.imageCover}
                  src={CONFIG.BASE_URL + item.image}
                  width="210px"
                  height="112px"
                  alt={item.title}
                />
              </div>
            </a>
          </Link>
          <div>
            <Link
              href={{
                pathname: `/post`,
                query: { id: item._id },
              }}
            >
              <a>
                <h3
                  onClick={() => {
                    handleClickLink(item);
                  }}
                  className={styles.titleContent}
                >
                  {item.title}
                </h3>
              </a>
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
      <div>
        <SideBar
          data={reviewLatest}
          title="Bài viết gần đây"
          onItemClick={handleOnItemLatestClick}
          isLoading={isLatestLoading}
        />
        <SideBar
          data={reviewRatest}
          title="Bài viết nổi bật"
          onItemClick={handleOnItemRatestClick}
          isLoading={isRatestLoading}
          className="mt-50"
        />
      </div>
    </div>
  );
}

export default MainContent;
