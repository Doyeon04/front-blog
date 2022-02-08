import React from "react";
import styles from "./modify.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { token } from "../Api";

const Modify = (props) => {
  //const token = localStorage.getItem("token");

  const baseTitle = useLocation().state.title;
  const baseContent = useLocation().state.content;
  const postId = useLocation().state.postId;
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState(baseTitle);
  const [editedContent, setEditedContent] = useState(baseContent);

  const [file, setFile] = useState("");
  const [urlImg, setUrlImg] = useState(""); //img url

  //const [id, setId] = useState(postId);
  //setId(useLocation().state.content.postId);

  //console.log("postId:", useLocation().state.postId);
  //console.log(postId);

  console.log(urlImg.toString() + " " + editedContent);

  const onEditChangeTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const onEditChangeContent = (e) => {
    setEditedContent(e.target.value);
  };

  const Submit = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      content: urlImg + " " + editedContent,
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
    <div className={styles.container}>
      <Header />
      <Form className={styles.Form}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={onEditChangeTitle}
            value={editedTitle}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            value={editedContent}
            onChange={onEditChangeContent}
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
      <Button onClick={Submit}>등록</Button>
      <div>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={onChange}
        ></input>
      </div>
      {file && (
        <div>
          <img src={file} alt="image" />
        </div>
      )}
      <button className={styles.imageButton}>등록</button>
      <span>
        {editedContent} {editedTitle}
      </span>
    </div>
  );
};

export default Modify;
