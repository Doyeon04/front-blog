import React, { useState, useRef } from "react";
import Header from "../component/header/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 120px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 5px;
  height: 35px;
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0px 14px 0px;
  height: 35px;
  border: 1px solid gray;
  padding: 7px;
`;

function SignUp() {
  let nameInputRef = useRef();
  let PWInputRef = useRef();
  let emailInputRef = useRef();

  const [useInputNameValue, setInputNameValue] = useState();
  const [useInputEmailValue, setInputEmailValue] = useState();
  const [useInputPWValue, setInputPWValue] = useState();

  function handleNameValue() {
    const inputNameValue = nameInputRef.current.value;
    setInputNameValue(inputNameValue);
  }

  function handleEmailValue() {
    const inputEmailValue = emailInputRef.current.value;
    setInputEmailValue(inputEmailValue);
  }

  function handlePWValue() {
    const inputPWValue = PWInputRef.current.value;
    setInputPWValue(inputPWValue);
  }

  console.log(useInputNameValue, useInputEmailValue, useInputPWValue);

  function enroll(e) {
    e.preventDefault();

    var axios = require("axios");
    var data = JSON.stringify({
      email: useInputEmailValue,
      password: useInputPWValue,
      username: useInputNameValue,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/api/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Container>
      <Header />
      <form type="submit" onSubmit={enroll} style={{ width: 300 }}>
        <h2
          style={{
            marginBottom: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          회원가입
        </h2>
        <div>
          <label>사용자 이름</label>
        </div>
        <Input
          onChange={handleNameValue}
          type="text"
          maxLength="20"
          placeholder="10자리 이내로 입력"
          ref={nameInputRef}
        />
        <div>
          <label>이메일</label>
        </div>
        <Input onChange={handleEmailValue} type="text" ref={emailInputRef} />
        <div>
          <label>비밀번호</label>
        </div>
        <Input onChange={handlePWValue} type="password" ref={PWInputRef} />
        <div>
          <Button>입력</Button>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
