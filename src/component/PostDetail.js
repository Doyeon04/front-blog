import { useParams, useLocation } from "react-router";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import { Link, useNavigate } from "react-router-dom";
import Content from "./content/Content";
import { token } from "./Api";


function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [childReply, setChildReply] = useState(false);

  const [clickChildReplyIndex, setClickChildReply] = useState();

  console.log("postId:", postId);

  //const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiYmxvZyBwcm9qZWN0IiwiaWF0IjoxNjQ0MDQyNDcwLCJleHAiOjE2NTI2ODI0NzB9.NCoq6o8qLnWoBqw6ob3gOhVDR87ZGgruPiGeWEhyfOugC3ZNjCFFcF-Dn7xUInFYfNv8XY-yKznCQWqj8qX1rw";

  const onDelete = (event) => {
    event.preventDefault();

    //원래 페이지로 돌아가기 */

    var axios = require("axios");
    var data = JSON.stringify("string");

    var config = {
      method: "delete",
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
        navigate("/");
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

    var axios = require("axios");
    var data = JSON.stringify({
      content: text,
      parentReplyId: 0,
      postId: postId,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/api/reply",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        setCommentFunc(response.data.replyDtoList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createChildReply = (replyId) => {
    setChildReply((current) => !current);
    setClickChildReply(replyId);

    /*  comments.map((order) => {
      if (order.replyId === replyId) {
        setChildReply((current) => !current);
        setClickChildReply(replyId);
      }
    }); */
  };

  const [childReplyTyping, setChildReplyType] = useState();

  /* const postChildReply = (e) => {
    setChildReplyType(e.target.value);
  }; */

  const onSubmit = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      content: childReplyTyping,
      parentReplyId: clickChildReplyIndex,
      postId: postId,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/api/reply",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
            {comments.map((reply, index) => (
              <li key={reply.replyId}>
                {reply.content}
                <button
                  id={reply.replyId}
                  onClick={(e) => createChildReply(reply.replyId)}
                >
                  +
                </button>
                <form onSubmit={onSubmit}>
                  {clickChildReplyIndex == index + 1 && childReply ? (
                    <input
                      type="text"
                      onChange={(e) => {
                        setChildReplyType(e.target.value);
                      }}
                    />
                  ) : null}
                  <button>댓글 등록</button>
                </form>
              </li>
            ))}
          </ul>
          <span>{clickChildReplyIndex}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
