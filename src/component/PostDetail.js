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
  width: 90%;
  height: 50px;
  border: 1px solid gray;
`;

const CommentContainer = styled.div`
  height: 800px;

  padding: 50px;
`;

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CommentBtn = styled.button`
  width: 60px;
  height: 50px;
  margin-left: 40px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  background-color: #b4d8e7;
  color: white;
  margin: auto 0;
`;

const CommentsUl = styled.ul`
  margin: 30px 0px;
  padding: 0;
`;

const CommentsLi = styled.li`
  width: 100%;
  padding: 0px 10px;
  list-style: none;
`;

const OneComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  border-bottom: 1px solid gray;
`;

const OneCommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyBtn = styled(CommentBtn)`
  width: 60px;
  height: 30px;
  margin: auto;
  margin: 0px 10px;
`;

const ReplyDeleteBox = styled.div`
  position: relative;
  top: 50px;
  height: 40px;
`;

const ChildReplyForm = styled.form`
  margin-left: 50px;
`;

const ChildReplies = styled.ul`
  padding: 0px;
`;

const ChildOneComment = styled(OneComment)`
  padding: 10px 50px;
`;

function PostDetail(props) {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [childReply, setChildReply] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [clickChildReplyIndex, setClickChildReply] = useState();

  console.log("postId:", postId);

  //const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiYmxvZyBwcm9qZWN0IiwiaWF0IjoxNjQ0MDQyNDcwLCJleHAiOjE2NTI2ODI0NzB9.NCoq6o8qLnWoBqw6ob3gOhVDR87ZGgruPiGeWEhyfOugC3ZNjCFFcF-Dn7xUInFYfNv8XY-yKznCQWqj8qX1rw";

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
        console.log("getResponse에서 받아옴:", response.data.replyResponseList); // 이게 comments임
        let result = response.data.replyResponseList;
       
        const str = response.data.content.split(' ')
         const urlImage = str[0];
         const content = str.slice(1).toString();
         console.log(content);

        setImgUrl(urlImage)
        setComments(result);

        setTitle(response.data.title);
        setContent(content);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = (event) => {
    event.preventDefault();

    //원래 페이지로 돌아가기 */
    console.log("삭제버튼누름");
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
        console.log(response.data.replyResponseList);
        setComments(response.data.replyResponseList);
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
    // 자식 댓글 등록하기
    setChildReplyType("");
    setChildReply(false);

    e.preventDefault();
    console.log("자식 댓글 담");
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
        setComments(response.data.replyResponseList);
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
        <div className={styles.postContent}>{content}</div>
        <div className = {styles.img_container}>
          <img src = {imgUrl}/>
        </div>

        <CommentContainer>
          <CommentBox>
            <CommentInput
              ref={textRef}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter" && textRef !== null) {
                  replySubmit();
                  textRef.current.value = "";
                }
              }}
            />
            <CommentBtn onClick={replySubmit}>입력</CommentBtn>
          </CommentBox>

          <CommentsUl>
            {comments?.map((reply, index) => (
              <CommentsLi key={reply.parentReplyDto.replyId}>
                <OneComment>
                  <OneCommentInfo>
                    <h5 style={{ fontWeight: "bold" }}>
                      {reply.parentReplyDto.userInfo.username}
                    </h5>
                    <span>{reply.parentReplyDto.content}</span>
                    <span
                      style={{ marginTop: 10, fontSize: 12, color: "gray" }}
                    >
                      {reply.parentReplyDto.chgDt.slice(0, 10)}{" "}
                      {reply.parentReplyDto.chgDt.slice(11, 19)}
                    </span>
                  </OneCommentInfo>
                  <ReplyDeleteBox>
                    <ReplyBtn
                      id={reply.parentReplyDto.replyId}
                      onClick={(e) =>
                        createChildReply(reply.parentReplyDto.replyId)
                      }
                    >
                      답글
                    </ReplyBtn>
                    <ReplyBtn
                      onClick={() =>
                        deleteChildReply(reply.parentReplyDto.replyId)
                      }
                    >
                      삭제
                    </ReplyBtn>
                  </ReplyDeleteBox>
                </OneComment>

                <ChildReplyForm onSubmit={childReplySubmit}>
                  {clickChildReplyIndex === reply.parentReplyDto.replyId &&
                  childReply ? (
                    <>
                      <input
                        style={{ width: 500, height: 50, margin: 20 }}
                        type="text"
                        onChange={(e) => {
                          setChildReplyType(e.target.value);
                        }}
                      />
                      <ReplyBtn> 등록</ReplyBtn>
                    </>
                  ) : null}
                </ChildReplyForm>
                <ChildReplies>
                  {reply.childReplyDtoList?.map((child) => (
                    <ChildOneComment>
                      <OneCommentInfo>
                        <h5 style={{ fontWeight: "bold" }}>
                          {child.userInfo.username}
                        </h5>
                        <span>{child.content}</span>
                        <span
                          style={{ marginTop: 10, fontSize: 12, color: "gray" }}
                        >
                          {child.chgDt.slice(0, 10)} {child.chgDt.slice(11, 19)}
                        </span>
                      </OneCommentInfo>
                      <ReplyBtn onClick={() => deleteChildReply(child.replyId)}>
                        삭제
                      </ReplyBtn>
                    </ChildOneComment>
                  ))}
                </ChildReplies>
              </CommentsLi>
            ))}
          </CommentsUl>
        </CommentContainer>
      </div>
    </div>
  );
}

export default PostDetail;