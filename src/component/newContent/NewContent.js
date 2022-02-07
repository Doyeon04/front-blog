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
  const [file, setFile] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgUrl, setUrlImg] =useState('')
  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);

  console.log("title:", title);
  console.log("content:", content);

  const submit = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      content: imgUrl +' '+ content,
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
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
    
    const img = e.target.files[0];
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
       setUrlImg(res.data)
      })
      .catch((err) => {
        alert("실패");
      });
  };

  

  return (
    <div className={styles.container}>
      <Header />
      <Form className={styles.Form}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={onChangeTitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            onChange={onChangeContent}
            className="form-control"
            as="textarea"
            placeholder="example"
            rows={15}
            style={{
              outLine: "none",
              color: "red",
              border: "0",
            }}
          />
        </Form.Group>
      </Form>

      <div>
        <img src = {imgUrl}/>
      </div>

      <div>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={onChange}
        ></input>
      </div>
      {
        file&&(
      <div>
        <img src = {file}  alt = "image"/>
      </div>
        )
      }
      <Button onClick={submit}>등록</Button>
    </div>
  );
};

export default NewContent;
