import { useParams, useLocation } from "react-router";

import axios from "axios";
import { useState, useEffect  } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import {Link,useNavigate} from "react-router-dom";

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const onDelete = (event) => {
    event.preventDefault();
    axios
    .delete(`http://localhost:8080/api/posts/${postId}`)
    .then((response) => {
      // response
      console.log("content:", response);
    })
    .catch((error) => {
      // 오류발생시 실행
    })
    .then(() => {
      // 항상 실행
      navigate("/");
    });
    //원래 페이지로 돌아가기 

  }

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
     <div>
       <button onClick = {onDelete}>삭제</button>
       </div>
           
      </div>
    </div>
  );
}

export default PostDetail;
