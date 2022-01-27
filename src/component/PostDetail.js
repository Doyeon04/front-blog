import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import Content from "./content/Content";

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  console.log(props.location);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        // response
        console.log("content:", response);
        console.log(response.data.title);
        console.log(response.data.content);

        setTitle(response.data.title);
        setContent(response.data.content);
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
      <div className={styles.postContainer}>
        <div className={styles.postTitle}>{title}</div>
        <div className={styles.postContent}>{content}</div>

        <div className={styles.BtnContainer}>
          <button className={styles.Btn}>수정</button>
          <button className={styles.Btn}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
