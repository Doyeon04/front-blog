import React from "react";
import styles from "./modify.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { token } from "../Api";
import newContentStyles from "../newContent/NewContent.module.css";
const Modify = (props) => {
  //const token = localStorage.getItem("token");

  const baseTitle = useLocation().state.title;
  const baseContent = useLocation().state.content;
  const postId = useLocation().state.postId;
  const imgUrl = useLocation().state.imgUrl;
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState(baseTitle);
  const [editedContent, setEditedContent] = useState(baseContent);

  const [file, setFile] = useState("");
  const [urlImg, setUrlImg] = useState(imgUrl); //img url
  const [postContent, setPostContent] = useState();
  const [inputFileName,setInputFileName] = useState("첨부 파일");
  
  console.log(imgUrl);

  const onEditChangeTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const onEditChangeContent = (e) => {
    setEditedContent(e.target.value);
  };

  const Submit = () => {
    console.log(urlImg);
    console.log("editedContet:", editedContent);

    var axios = require("axios");

    var data = JSON.stringify({
      content: urlImg.includes(
        "https://blog-img-store2.s3.ap-northeast-2.amazonaws.com"
      )
        ? urlImg + " " + editedContent
        : editedContent,

      title: editedTitle,
    });

    var config = {
      method: "put",
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
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
   
    const img = e.target.files[0]; 
    setInputFileName(img.name);
    console.log(img);
    const formData = new FormData();
    formData.append("multipartFile", img);
    return axios
      .post("http://localhost:8080/api/img/s3/posts/upload", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUrlImg(res.data);
      })
      .catch((err) => {
        alert("실패");
      });
  };

  return (
    <div className={newContentStyles.container}>
      <Header />
      <div className={newContentStyles.inputContainer}>
      <form>
          <input
            className={newContentStyles.inputTitle}
            type="text"
            onChange={onEditChangeTitle}
            value={editedTitle}
          />
          <textarea
            value={editedContent}
            onChange={onEditChangeContent}
            className={newContentStyles.inputContent} 
          />
     </form>
      </div>
      <div className={newContentStyles.imageInputContainer}>
        
       <form className={newContentStyles.imageInputFile}>
        
        <input 
          id="image_input"
          className={newContentStyles.imageButton}
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={onChange}
          
        ></input>
        <label for="image_input">
          파일 선택
        </label>
        <input className={newContentStyles.upload_name} value={inputFileName} placeholder="첨부파일" maxLength={30}  onChange={onChange}></input>
      </form>  
     
      <button className={newContentStyles.imageButton} onClick={Submit}>등록</button>
      
     </div>
     <div className={newContentStyles.inputFileImageDiv}>
       <p>   </p>
     {urlImg && (
        <div>
          <img src={urlImg} alt="image" />
        </div>
      )}
      </div>
    </div>
  );
};

export default Modify;
