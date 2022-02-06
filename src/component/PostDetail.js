import { useParams, useLocation } from "react-router";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import { Link, useNavigate } from "react-router-dom";
import Content from "./content/Content";
import { token } from "./Api";
import styled from "styled-components";

const CommentInput = styled.input`
  width: 80%;
  height: 50px;
`;

const CommentContainer = styled.div`
  height: 800px;
  background-color: antiquewhite;
  padding: 50px;
`;

const CommentBox = styled.div`
  display: flex;
`;

const CommentBtn = styled.button`
  width: 50px;
  height: 40px;
  margin-left: 40px;
`;

const CommentsUl = styled.ul`
  margin: 30px 0px;
`;

const CommentsLi = styled.li`
  width: 100%;
  padding: 20px;
  list-style: none;
  border-bottom: 1px solid gray;
`;

const OneComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [childReply, setChildReply] = useState(false);

  const [clickChildReplyIndex, setClickChildReply] = useState();

  console.log("postId:", postId);

  //const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiYmxvZyBwcm9qZWN0IiwiaWF0IjoxNjQ0MDQyNDcwLCJleHAiOjE2NTI2ODI0NzB9.NCoq6o8qLnWoBqw6ob3gOhVDR87ZGgruPiGeWEhyfOugC3ZNjCFFcF-Dn7xUInFYfNv8XY-yKznCQWqj8qX1rw";

  const ReplyBtn = styled.button`
    width: 70px;
    height: 50px;
  `;

  const getResponse = () => {
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
        console.log(response.data);
        let result = response.data.replyDtoList;
        setCommentFunc(result);

        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
  const [parentContent,setParentContent] = useState([]);
  const textRef = useRef();

  useEffect(() => {
    getResponse();
  }, []);

  const setCommentFunc = (array) => {
    setComments(array);
    const responselist = array.replyResponseList;
    responselist.map((reply,index)=>{
      console.log("내용",reply.parentReplyDto);
    })
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
        console.log(JSON.stringify(response.data.replyDtoList));
        
        setCommentFunc(JSON.stringify(response.data.replyDtoList));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createChildReply = (replyId) => {
    setChildReply((current) => !current);
    setClickChildReply(replyId);
    //getResponse();
    console.log("클릭한 +버튼", replyId);
  };

  const [childReplyTyping, setChildReplyType] = useState();

  /* const postChildReply = (e) => {
    setChildReplyType(e.target.value);
  }; */

  const childReplySubmit = (e) => {
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
        console.log(response.data);
        getResponse();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteChildReply = (replyId) => {
    console.log("삭제 버튼", replyId);
    var axios = require("axios");
    var data = JSON.stringify({});

    var config = {
      method: "delete",
      url: `http://localhost:8080/api/reply/${replyId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getResponse();
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
        <CommentContainer>
          <CommentBox>
            <CommentInput
              ref={textRef}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  textRef.current.value = "";
                }
              }}
            />
            <CommentBtn onClick={replySubmit}>입력</CommentBtn>
          </CommentBox>

          <CommentsUl>
            {comments?.map((reply, index) => (
              
              <CommentsLi key={reply.replyId}>
                <OneComment>
                  <div>
                    <span>{reply.parentReplyDto.content}</span>
                  </div>
                  <div>
                    <ReplyBtn
                      id={reply.replyId}
                      onClick={(e) => createChildReply(reply.replyId)}
                    >
                      답글
                    </ReplyBtn>
                    <ReplyBtn onClick={() => deleteChildReply(reply.replyId)}>
                      삭제
                    </ReplyBtn>
                  </div>
                </OneComment>

                <form onSubmit={childReplySubmit}>
                  {clickChildReplyIndex === reply.replyId && childReply ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) => {
                          setChildReplyType(e.target.value);
                        }}
                      />
                      <ReplyBtn> 등록</ReplyBtn>
                    </>
                  ) : null}
                </form>
              </CommentsLi>
            ))}
          </CommentsUl>
        </CommentContainer>
      </div>
    </div>
  );
}

export default PostDetail;