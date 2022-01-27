import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import PostDetail from "../PostDetail";

const Content = (props) => {
  const [items, setItems] = useState([]);
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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    axios
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
      });
  }, []);

  //localhost:8080/api/posts/2
  const datas = items.map(function (item) {
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
  });

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <div>
            {items.map((item) => (
              <Link
                to={{
                  pathname: `/${item.id}`,
                  state: { title: item.title },
                }}
              >
                <div key={item.id}>{item.title}</div>
              </Link>
            ))}
          </div>
        </Masonry>
      </div>
    </div>
  );
};

export default Content;
