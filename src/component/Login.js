import Header from "./header/Header.js";
import TitleBox from "./titleBox/TitleBox.js";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 120px 0px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0px 14px 0px;
  height: 35px;
  border: none;
  border-bottom: 1px solid gray;
  padding: 7px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 5px;
  height: 35px;
`;
function Login() {
  const [id, setId] = useState();
  const [ps, setPs] = useState();

  const replySubmit = (event) => {
    event.preventDefault();
    var axios = require("axios");
    var data = JSON.stringify({
      email: id,
      password: ps,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/api/auth/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        // if (response.data.token) {
        // window.location.href="/";
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
    setId("");
    setPs("");
    //만약 정보가 같다면 HOME으로 이동해서 보여주기
    //다르다면 알림창 띄우기
  };
  const handleSubmitId = (event) => {
    setId(event.currentTarget.value);
  };
  const handleSubmitPs = (event) => {
    setPs(event.currentTarget.value);
  };
  return (
    <Container>
      <Header />
      <LoginForm>
        <h2
          style={{
            marginBottom: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          LOGIN
        </h2>

        <Input
          value={id || ""}
          onChange={handleSubmitId}
          type="text"
          placeholder="Email ID"
        />

        <Input
          value={ps || ""}
          onChange={handleSubmitPs}
          type="password"
          placeholder="Password"
        />

        <Button onClick={replySubmit}>LOGIN</Button>
      </LoginForm>
    </Container>
  );
}
export default Login;
