import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();

  console.log(postId);

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

  const implementPut = () =>{
    axios.put(`http://localhost:8080/api/posts/${postId}`, {
     "content": "string",
    "id": 0,
  "title": "string"
    }).then(res =>{
      console.log(res);
    }).catch(err =>{
      console.log(err)
    })
  }

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.BtnContainer}>
        <button onClick = {implementPut}>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default PostDetail;
