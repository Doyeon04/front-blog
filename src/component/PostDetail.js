import { useParams, useLocation } from "react-router";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import { Link, useNavigate } from "react-router-dom";
import Content from "./content/Content";

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const onDelete = (event) => {
    event.preventDefault();
    /*  axios
      .delete(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        // response
        //console.log("content:", response);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
        navigate("/");
      });
      
    //원래 페이지로 돌아가기 */

    var axios = require("axios");
    var data = JSON.stringify("string");

    var config = {
      method: "delete",
      url: "http://localhost:8080/api/posts/1",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comments, setComments] = useState([]);

  const textRef = useRef();

  useEffect(() => {
    /* axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        let result = response.data.replyDtoList;
        setCommentFunc(result);

        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      }); */
    var axios = require("axios");
    var data = JSON.stringify({});

    var config = {
      method: "get",
      url: `http://localhost:8080/api/posts/${postId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let result = response.data.replyDtoList;
        setCommentFunc(result);

        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const setCommentFunc = (array) => {
    setComments(array);
  };
  const replySubmit = () => {
    let text = textRef.current.value;
    textRef.current.value = "";
    axios
      .post("http://localhost:8080/api/reply", {
        content: text,
        postsId: postId,
      })
      .then((response) => {
        let result = response.data.replyDtoList;
        setCommentFunc(result);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      });
  };

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.postContainer}>
        <div className={styles.postTitle}>{title}</div>
        <div className={styles.postContent}>{content}</div>

        <div>
          <input
            ref={textRef}
            type="text"
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                textRef.current.value = "";
              }
            }}
          />
          <button onClick={replySubmit}>submit</button>
        </div>

        <div className={styles.BtnContainer}>
          <Link
            to={"/modify"}
            state={{
              title: title,
              content: content,
              postId: postId,
            }}
          >
            <button className={styles.Btn}>수정</button>
          </Link>
          <button className={styles.Btn} onClick={onDelete}>
            삭제
          </button>
        </div>
        <div className={styles.commentBox}>
          <ul>
            {comments.map((reply) => (
              <li key={reply.replyId}>{reply.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
