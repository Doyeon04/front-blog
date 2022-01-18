import React from "react";
import styles from "./TitleBox.module.css";
const TitleBox = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <span>Blog Title</span>
      </div>
    </div>
  );
};

export default TitleBox;
