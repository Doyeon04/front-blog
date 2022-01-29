import React from "react";
import styles from "./modify.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Modify = (props) => {
  const baseTitle = useLocation().state.title;
  const baseContent = useLocation().state.content;
  const postId = useLocation().state.postId;
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState(baseTitle);
  const [editedContent, setEditedContent] = useState(baseContent);

  //const [id, setId] = useState(postId);
  //setId(useLocation().state.content.postId);

  console.log("postId:", useLocation().state.postId);
  console.log(postId);

  const onEditChangeTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const onEditChangeContent = (e) => {
    setEditedContent(e.target.value);
  };

  const Submit = () => {
    axios
      .put(`http://localhost:8080/api/posts/${postId}`, {
        content: editedContent,
        postsId: postId,
        title: editedTitle,
      })
      .then((response) => {
        // response
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
        navigate("/");
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
    </div>
  );
};

export default Modify;