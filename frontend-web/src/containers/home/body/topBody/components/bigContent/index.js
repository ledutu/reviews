import React from "react";
// import styles from "./BigContent.module.scss";
import Link from "next/link";
import Image from "next/image";

function BigContent({ post, styles, handleClickLink }) {
  return (
    <div className={styles.bigContent}>
      <div className={styles.wrapper}>
        <Link
          href={{
            pathname: `/post`,
            query: { id: post._id },
          }}
        >
          <a>
            <div
              onClick={() => {
                handleClickLink(post);
              }}
            >
              <Image
                className={styles.imageCover}
                src={"http://api.reviewduthu.vn" + post.image}
                width="720px"
                height="405px"
                alt="newestContent"
              />
            </div>
          </a>
        </Link>
        <div className={styles.bigContentTitle}>
          <h2 className={styles.title}>{post.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default BigContent;
