import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = (props) => {
  return (
    <Navbar
      bg="light"
      style={{
        border: "1px solid",
        height: "90px",
        position: "fixed",
        top: "0",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8%",
      }}
      variant="light"
    >
      <div>
        <Navbar.Brand href="/">blogg</Navbar.Brand>
      </div>
      <div>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">neighbor</Nav.Link>
          <Nav.Link href={`/SignUp`}>회원가입</Nav.Link>
          <Nav.Link href={`/writeContent`}>글쓰기</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
