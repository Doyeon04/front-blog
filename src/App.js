import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./routes/Home";
import NewContent from "./component/newContent/NewContent";
import Header from "./component/header/Header.js";
import PostDetail from "./component/PostDetail.js";

import Login from "./component/Login.js";
import Modify from "./component/modify/Modify.js";
import SignUp from "./component/SignUp.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/writeContent" element={<NewContent />}></Route>
        <Route path="/:postId" element={<PostDetail />}></Route>
         <Route path="/modify" element={<Modify />}></Route>
         <Route path="/Login" element={<Login />}></Route>     
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
