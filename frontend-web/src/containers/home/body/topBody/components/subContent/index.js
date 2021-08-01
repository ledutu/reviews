import Image from "next/image";
import Link from "next/link";
import React from "react";

function SubContent({ item, styles, handleClickLink }) {
  return (
    <div>
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
              src={"http://api.reviewduthu.vn" + item.image}
              width="300"
              height="160"
              alt="newestContent"
            />
          </div>
        </a>
      </Link>
      <h3 className={styles.title}>{item.title}</h3>
    </div>
  );
}

export default SubContent;
