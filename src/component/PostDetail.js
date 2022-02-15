import { useParams, useLocation } from "react-router";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import styles from "./PostDetail.module.css";
import { Link, useNavigate } from "react-router-dom";
import Content from "./content/Content";
import { token } from "./Api";
import styled from "styled-components";

const CommentInput = styled.textarea`
  width: 90%;
  height: 80px;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
  padding: 5px;
`;

const ChildReplyInput = styled(CommentInput)`
  width: 630px;
  margin: 20px 0px 5px 0px;
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
  border-bottom: 1px solid #d3d3d3;
`;

const OneCommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyBtn = styled(CommentBtn)`
  width: 60px;
  height: 30px;
  margin: auto;
  margin-left: 10px;
  &:hover {
    transform: scale(1.05);
  }
  transition: 0.25s;
`;

const ReplyDeleteBox = styled.div``;

const ChildReplyForm = styled.form`
  margin-left: 50px;
`;

const ChildReplies = styled.ul`
  padding: 0px;
`;

const ChildOneComment = styled(OneComment)`
  padding: 10px 0px 10px 60px;
  display: flex;
  justify-content: space-between;
`;

function PostDetail(props) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [childReply, setChildReply] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [clickChildReplyIndex, setClickChildReply] = useState();
  const [writer, setWriter] = useState();
  const [postTime, setPostTime] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comments, setComments] = useState([]);
  const [parentContent, setParentContent] = useState([]);
  const textRef = useRef();
  const [replyNum, setReplyNum] = useState();

  //window.scrollTo(0, 0);

  //const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiYmxvZyBwcm9qZWN0IiwiaWF0IjoxNjQ0MDQyNDcwLCJleHAiOjE2NTI2ODI0NzB9.NCoq6o8qLnWoBqw6ob3gOhVDR87ZGgruPiGeWEhyfOugC3ZNjCFFcF-Dn7xUInFYfNv8XY-yKznCQWqj8qX1rw";

  const getResponse = () => {
    console.log("postId:", postId);
    console.log(`http://localhost:8080/api/posts/${postId}`);

    var axios = require("axios");
   // var data = JSON.stringify({});

    var config = {
      method: "get",
      url: `http://localhost:8080/api/posts/${postId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
   //   data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        console.log("getResponse에서 받아옴:", response.data.replyResponseList); // 이게 comments임

        let result = response.data.replyResponseList;
        const str = response.data.content.split(",");
        const urls = str[0].split(" ")
        const content = str[1];

        console.log(urls);
        console.log(content);
        setContent(content);
        setImgUrl(urls)
        
        // if (
        //   str[0].includes(
        //     "https://blog-img-store2.s3.ap-northeast-2.amazonaws.com"
        //   )
        // ) {
        //   const urlImage = str[0];
        //   setContent(str.slice(1).join(" ").toString());

        //   setImgUrl(urlImage);
        // } else {
        //   setContent(response.data.content);
        // }
        

        countReply(response.data.replyResponseList);
        setWriter(response.data.userInfo.username);
        setPostTime(response.data.chgDt);
        setComments(result);
        setTitle(response.data.title);

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

  useEffect(() => {
    getResponse();
  }, []);

  const countReply = (replyList) => {
    const eachChildReply = replyList.map(
      (reply) => reply.childReplyDtoList.length
    );

    const childReplySum = eachChildReply.reduce(function (
      accumulator,
      currentValue
    ) {
      return accumulator + currentValue;
    },
    0);

    setReplyNum(replyList.length + childReplySum);
  };
  const replySubmit = () => {
    let text = textRef.current.value;
    textRef.current.value = "";//textRef의 현재값을 비워줌 input value를 비워줌

    var axios = require("axios");
    var data = JSON.stringify({
      content: text,
      parentReplyId: 0,
      postId: postId,
    });//댓글 내용과 부모 댓글 아이디를 보냄 얘는 부모 댓글이고 대댓글이 아니니까 parentReplyId는 0으로 지정

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

        const replyList = response.data.replyResponseList;

        countReply(replyList);
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
      <Header />
      <div className={styles.container}>
        <div></div>
        <div className={styles.postContainer}>
          <div className={styles.postTitle}>{title}</div>
          <div className={styles.BtnContainer}>
            <span>{writer}</span>
            <span>
              {postTime?.slice(0, 10)} {postTime?.slice(11, 19)}
            </span>
            <Link
              to={"/modify"}
              state={{
                title: title,
                content: content,
                postId: postId,
                imgUrl: imgUrl,
              }}
            >
              <button className={styles.Btn}>수정</button>
            </Link>

            <button className={styles.Btn} onClick={onDelete}>
              삭제
            </button>
          </div>
          <div className={styles.postContent}>
            <div className={styles.img_container}>
            {imgUrl && (
              imgUrl.map(url => <img src = {url}/>)
             )}
            </div>
         {
            content?.split('\n').map((line,index)=>{
                 return <p>{line}<br/> </p>
              })
            }
          
          </div>

          <CommentContainer>
            <span style={{ color: "#1e6b7b" }}>댓글 {replyNum}</span>
            <CommentBox>
              <CommentInput
                ref={textRef}
                type="text"
                wrap="hard"
                onKeyPress={(e) => {
                  if (e.key == "Enter" && textRef !== null) {
                  }
                }}
              />
              <div>
                <ReplyBtn onClick={replySubmit}>입력</ReplyBtn>
              </div>
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
                        style={{
                          marginTop: 10,
                          fontSize: 12,
                          color: "#d3d3d3",
                        }}
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
                      <div>
                        <ChildReplyInput
                          type="text"
                          onChange={(e) => {
                            setChildReplyType(e.target.value);
                          }}
                        />
                        <div>
                          <ReplyBtn style={{ float: "left", marginLeft: 0 }}>
                            {" "}
                            등록
                          </ReplyBtn>
                        </div>
                      </div>
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
                            style={{
                              marginTop: 10,
                              fontSize: 12,
                              color: "#d3d3d3",
                            }}
                          >
                            {child.chgDt.slice(0, 10)}{" "}
                            {child.chgDt.slice(11, 19)}
                          </span>
                        </OneCommentInfo>
                        <div>
                          <ReplyBtn
                            style={{}}
                            onClick={() => deleteChildReply(child.replyId)}
                          >
                            삭제
                          </ReplyBtn>
                        </div>
                      </ChildOneComment>
                    ))}
                  </ChildReplies>
                </CommentsLi>
              ))}
            </CommentsUl>
          </CommentContainer>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
