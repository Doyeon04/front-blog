import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";

const Content = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.writeBtnBox}>
        {/*<Button style={{}}>글쓰기</Button>*/}
      </div>

      <div className={styles.contentBox}></div>
    </div>
  );
};

export default Content;
