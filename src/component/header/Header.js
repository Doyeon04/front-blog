import { useState, React, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./header.module.css";
const Header = (props) => {
  const [login, setLogin] = useState(true);
  const [newContent, setNewContent] = useState(true);
  const [signUp, setSignUp] = useState(true);
  const [home, setHome] = useState(true);

  useEffect(() => {
    if (props.name === "Login") {
      setLogin(false);
    } else if (props.name === "NewContent") {
      setNewContent(false);
    } else if (props.name == "SignUp") {
      setSignUp(false);
    } else if (props.name == "Home") {
      setHome(false);
    }
    console.log(login);
  }, []);

  return (
    <Navbar
      bg="light"
      style={{
        border: "1px solid rgb(199, 199, 199)",
        height: "90px",
        position: "fixed",
        top: "0",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8%",
        zIndex: "10",
      }}
      variant="light"
    >
      <div>
        <Navbar.Brand href="/">blog</Navbar.Brand>
      </div>
      <div>
        <Nav className="me-auto">
          {/* <Nav.Link href="/"  className= {home ? "" : "opacity-0"}>Home</Nav.Link>
         <Nav.Link href={`/Login`} className= {login ? "" : "opacity-0"}>로그인</Nav.Link> 
         <Nav.Link href={`/SignUp`} className= {signUp ? "" : "opacity-0"}>회원가입</Nav.Link>
         <Nav.Link href={`/writeContent`} className= {newContent ? "" : "opacity-0"}>글쓰기</Nav.Link> */}
          {home ? <Nav.Link href="/">Home</Nav.Link> : null}
          {login ? <Nav.Link href={`/Login`}>로그인</Nav.Link> : null}
          {signUp ? <Nav.Link href={`/SignUp`}>회원가입</Nav.Link> : null}
          {newContent ? (
            <Nav.Link href={`/writeContent`}>글쓰기</Nav.Link>
          ) : null}
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
