import React from "react";
import styles from "./NewContent.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
const NewContent = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <Form className={styles.Form}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
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
      <Button>등록</Button>
    </div>
  );
};

export default NewContent;
