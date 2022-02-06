import React from "react";
import styles from "./NewContent.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { token } from "../Api";

const NewContent = (props) => {
  //const token = localStorage.getItem("token");
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState('');
  const [imageFile, setImageFile] = useState("");

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);

  console.log("title:", title);
  console.log("content:", content);

  const submit = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      content: content,
      title: title,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/api/posts",
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

  const onChange = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', img);

    return axios.post("http://localhost:8080/api/img/s3/posts/upload", formData)
    .then(res => {
      alert('성공')
    }).catch(err => {
      alert('실패')
    })
}

  return (
    <div className={styles.container}>
      <Header />
      <div>
        <form>
          <span>제목</span>
          <input type="text" placeholder="제목을 입력하세요"  onChange={onChangeTitle}/>
       
          <span>내용</span>
          <input type="textarea" placeholder="내용을 입력하세요" onChange={onChangeContent}/>
       
          <Button onClick={submit}>등록</Button>
        </form>
      </div>

    <div>
       <input type='file' 
      accept='image/jpg,impge/png,image/jpeg,image/gif' 
      name='profile_img' 
      onChange={onChange}>
  </input>
  <Button onClick={submit}>등록</Button>
      </div>

     
    </div>
  );
};

export default NewContent;
