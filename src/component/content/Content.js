import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Content = (props) => {
  axios
    .get("http://localhost:8080/api/posts")
    .then((response) => {
      // response
      console.log(response);
    })
    .catch((error) => {
      // 오류발생시 실행
    })
    .then(() => {
      // 항상 실행
    });

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
