import React from "react";
import styles from "./Sidebar.module.scss";
export function SideBar() {
  return (
    <div className={styles.sideBar}>
      <h4 className={styles.sideBarTitle}>Bài viết nổi bật</h4>
    </div>
  );
}