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

  const onDelete = (event) => {
    event.preventDefault();
    axios
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
    //원래 페이지로 돌아가기
  };
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comments, setComments] = useState([]);

  const textRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
<<<<<<< HEAD
        // response
        let result = response.data.replyDtoList.map((a) => a.content);
        setComments(comments => [...comments, {result}])
=======
        let result = response.data.replyDtoList;
        setCommentFunc(result);

>>>>>>> 4505d24fe62a5098244fc4544404935cbb7c1f32
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

<<<<<<< HEAD

  const replySubmit = (event) =>{
    event.preventDefault();
    
   let text = textRef.current.value; 
 
    console.log(text);
    axios.post('http://localhost:8080/api/reply', {
        "content": text,
        "postsId": postId,
    }
  
    ).then((response)=>{
      // let result = response.data.replyDtoList.map((a) => a.content);
      // console.log("result:",result);
      //  setComments((comments) => [...comments, {result}])
      let result = response.data.replyDtoList.map((a) => a.content);
      result.push(text);
      console.log(comments===result);
      let temp = result;
      console.log(temp===comments);
      setComments((state,props)=>{
        return {temp};
      });
   //   setComments(temp);
      setTitle(response.data.title);
      setContent(response.data.content);
      console.log("comment:",comments);
        // axios
        // .get(`http://localhost:8080/api/posts/${postId}`)
        // .then((response)=>{
        //   let result = response.data.replyDtoList.map((a) => a.content);
        //    console.log("results",result);
        // });
    
      // const {
      //   "content" : text,
      //   "postsId":postId,
      // } = ex;
      // setComments((comments) => [...comments, {result}]);
    } )
  }
=======
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
>>>>>>> 4505d24fe62a5098244fc4544404935cbb7c1f32

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className={styles.postContainer}>
        <div className={styles.postTitle}>{title}</div>
        <div className={styles.postContent}>{content}</div>

        <div>
<<<<<<< HEAD
          <form>
          <input 
           ref = {textRef} 
           type = "text"
           onKeyPress = {(e) =>{
             if(e.key == "Enter"){
               
               textRef.current.value = "";
             }
           }

           }
           />
          <button onClick= {replySubmit}>submit</button>
          </form>
=======
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
>>>>>>> 4505d24fe62a5098244fc4544404935cbb7c1f32
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
