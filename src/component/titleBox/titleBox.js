import React from "react";
import styles from "./TitleBox.module.css";
const TitleBox = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.whiteBox}>
        <span>Blog Story</span>
       
      </div>
    </div>
  );
};

export default TitleBox;
