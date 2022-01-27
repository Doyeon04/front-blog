import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./routes/Home";
import NewContent from "./component/newContent/NewContent";
import Header from "./component/header/Header.js";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/writeContent" element={<NewContent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
