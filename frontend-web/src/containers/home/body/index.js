import React from "react";
import MainContent from "./mainBody";
import TopContent from "./topBody";
import styles from "./Content.module.scss";
export default function BodyComponent(posts) {
  return (
    <section id="content" className={styles.content}>
      <TopContent posts={posts} />
      <MainContent posts={posts} />
    </section>
  );
}
