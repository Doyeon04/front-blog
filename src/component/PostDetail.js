import { useParams, useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import Content from "./content/Content";
import {Link} from 'react-router-dom';

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  console.log(postId);

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

      <div className={styles.postContainer}>
        <div className={styles.postTitle}>{title}</div>
        <div className={styles.postContent}>{content}</div>
        <div className={styles.BtnContainer}>
          <Link
            to={{
            pathname: `/modify`,
            state: {
              id: postId
            }
          }}>
          <button className={styles.Btn}>수정</button>
          </Link>
          <button className={styles.Btn}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
