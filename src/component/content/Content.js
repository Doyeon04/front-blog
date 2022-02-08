import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail";
import { token } from "../Api";
import ItemDetail from '../itemDetail/itemDetail.jsx'

const Content = (props) => {
  const [items, setItems] = useState([]);
  //const token = localStorage.getItem("token");

  /*
  for (let i = 132; i < 135; i++) {

     let i = 0;

     
    axios
      .delete(`http://localhost:8080/api/posts/${i}`)
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }
  */

  useEffect(() => {
    /* axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        // response
        console.log("content:", response);
        console.log(response.data[0]);
        setItems(response.data);
        console.log(Object.values(response.data));
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      }); */
    var axios = require("axios");
    var data = JSON.stringify({});

    var config = {
      method: "get",
      url: "http://localhost:8080/api/posts",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //localhost:8080/api/posts/2
  /* const datas = items.map(function (item) {
    return (
      <Link
        to={{
          pathname: `/${item.id}`,
          state: { title: item.title },
        }}
      >
        <div key={item.id}>{item.title}</div>
      </Link>
    );
  }); */

  return (
    <div className={styles.container}>
     
        <div className={styles.masonry_container}>
          {items.map((item) => (
            <Link style = { {textDecoration: 'none'}}to={`/${item.postsId}`} state={{ title: item.title }}>
                <ItemDetail item = {item}/>  
            </Link>
          ))}
       
      </div>
    </div>
  );
};

export default Content;
