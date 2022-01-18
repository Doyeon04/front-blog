import React from "react";
import Header from "../component/header/Header";
import TitleBox from "../component/titleBox/TitleBox";
import Content from "../component/content/Content";

const Home = (props) => {
  return (
    <div>
      <Header></Header>
      <TitleBox></TitleBox>
      <Content></Content>
    </div>
  );
};

export default Home;
