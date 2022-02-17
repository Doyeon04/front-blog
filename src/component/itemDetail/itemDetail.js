import { useState, React, useEffect } from "react";
import styles from "./itemDetail.module.css";

const ItemDetail = ({ item }) => {
  const [replyNum, setReplyNum] = useState();
  console.log(item.content);
  const str = item.content.split(" ");
  console.log(str);
  const itemContent = str.slice(str.length).join(" ").toString();
  console.log(itemContent);
  const replyList = item.replyResponseList;
  const title = item.title.split("");
  useEffect(() => {
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
        <h3 className="title-box">
          {title.length > 70 ? title.slice(0, 70).join("") + "..." : title}
        </h3>
        <p className="content-box">{itemContent}</p>
      </div>
      <div className={styles.comments_box}>
        <span className={styles.comments_number}>{replyNum}</span>
        <span>comments</span>
      </div>
    </div>
  );
};

export default ItemDetail;
