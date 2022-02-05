import React from "react";
import styles from "./NewContent.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NewContent = (props) => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);

  console.log("title:", title);
  console.log("content:", content);

  const submit = () => {
    axios
      .post("http://localhost:8080/api/posts", {
        content: content,
        //id: "0",
        title: title,
      })
      .then((response) => {
        // response
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        navigate("/");
      });
    console.log(`등록완료. content: ${content}, title: ${title}`);
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

      <Button onClick={submit}>등록</Button>
    </div>
  );
};

export default NewContent;
