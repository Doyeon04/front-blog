import {useState,React, useEffect} from "react";
import styles from "./itemDetail.module.css";

const ItemDetail = ({ item }) => {
  const [replyNum,setReplyNum] = useState();

  const str = item.content.split(" ");
  const itemContent = str.slice(1).join(" ").toString();
  const replyList = item.replyResponseList;

  useEffect(()=>{
    const eachChildReply = replyList.map(
      (reply) => reply.childReplyDtoList.length
    );

    const childReplySum = eachChildReply.reduce(function (
      accumulator,
      currentValue
    ) {
      return accumulator + currentValue;
    },
    0);

    setReplyNum(replyList.length + childReplySum);
  });
  return (
    <div className={styles.itemDetail_container}>
      <div className={styles.item_container}>
        <h3>{item.title}</h3>
        <p>{itemContent}</p>
      </div>
      <div className={styles.comments_box}>
        <span className={styles.comments_number}>
          {replyNum}
        </span>
        <span>comments</span>
      </div>
    </div>
  );
};

export default ItemDetail;
