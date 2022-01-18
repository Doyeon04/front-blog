import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NewContent from "./component/newContent/NewContent";
import Header from "./component/header/Header.js";
function App() {
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
