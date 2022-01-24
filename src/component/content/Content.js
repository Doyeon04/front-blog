import React from "react";
import styles from "./Content.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";

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

  return (
    <div className={styles.container}>
      <div className={styles.writeBtnBox}>
        {/*<Button style={{}}>글쓰기</Button>*/}
      </div>

      <div className={styles.contentBox}>
        <div>
         { items.map((item)=>{
          (<div>
           {item.title}
           </div>)
         })}
         
          {/* {Object.values(items)}
         */}
        </div>

      </div>
    </div>
  );
};

export default Content;