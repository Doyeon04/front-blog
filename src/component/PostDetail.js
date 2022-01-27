import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();

  console.log(props.location);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        // response
        console.log("content:", response);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      });
  }, []);

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.BtnContainer}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default PostDetail;
