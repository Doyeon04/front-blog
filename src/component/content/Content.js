import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail";
import { token, URL } from "../Api";
import ItemDetail from "../itemDetail/itemDetail.js";

const Content = (props) => {
  const [items, setItems] = useState([]);
  //const token = localStorage.getItem("token");

  useEffect(() => {
    var axios = require("axios");
    var data = JSON.stringify({});

    var config = {
      method: "get",
      url: URL + "posts",
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

  return (
    <div className={styles.container}>
      <div className={styles.masonry_container}>
        {items.map((item) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/${item.postsId}`}
            state={{ title: item.title }}
          >
            <ItemDetail item={item} content={item.content} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Content;
