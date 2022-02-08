import React from "react";
import styles from "./itemDetail.module.css";

const ItemDetail = ({ item }) => {
  console.log(item.content.split(" ")[0]);
  const str = item.content.split(" ");
  const itemContent = str.slice(1).join(" ").toString();

  return (
    <div className={styles.itemDetail_container}>
      <div className={styles.item_container}>
        <h3>{item.title}</h3>
        <p>{itemContent}</p>
      </div>
      <div className={styles.comments_box}>
        <span className={styles.comments_number}>0</span>
        <span>comments</span>
      </div>
    </div>
  );
};

export default ItemDetail;
