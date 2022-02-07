import React from 'react';
import styles from './itemDetail.module.css';

const itemDetail = ({item}) => {
  return (
    <div className = {styles.itemDetail_container}>
      <div className = {styles.item_container}>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
      </div>
      <div className = {styles.comments_box}>
        <span className = {styles.comments_number}>0</span>
        <span>comments</span>
      </div>
    </div>
  );
};

export default itemDetail;