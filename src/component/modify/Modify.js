import React from "react";
/* import styles from "./modify.module.css"; */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { token, URL } from "../Api";
import styles from "../newContent/NewContent.module.css";
const Modify = (props) => {
  //const token = localStorage.getItem("token");
  const baseTitle = useLocation().state.title;
  const baseContent = useLocation().state.content;
  const postId = useLocation().state.postId;
  const imgUrl = useLocation().state.imgUrl;
  const navigate = useNavigate();

  const [editedTitle, setEditedTitle] = useState(baseTitle);
  const [editedContent, setEditedContent] = useState(baseContent);
  const [urlImg, setUrlImg] = useState(imgUrl); //img url

  const [inputFileName, setInputFileName] = useState("첨부 파일");

  console.log(urlImg);
  const onEditChangeTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const onEditChangeContent = (e) => {
    setEditedContent(e.target.value);
  };

  useEffect(() => {}, []);
  const Submit = () => {
    console.log(urlImg);
    console.log("editedContet:", editedContent);

    var axios = require("axios");
    const urlImgString = urlImg.join(" ");
    var data = JSON.stringify({
      content: urlImgString + "," + editedContent,
      title: editedTitle,
    });

    var config = {
      method: "put",
      url: URL + `posts/${postId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    // setFile(URL.createObjectURL(e.target.files[0]));

    const img = e.target.files[0];
    setInputFileName(img.name);
    console.log(img);
    const formData = new FormData();
    formData.append("multipartFile", img);
    return axios
      .post(URL + "img/s3/posts/upload", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUrlImg([...urlImg, res.data]);
      })
      .catch((err) => {
        alert("실패");
      });
  };

  return (
    <div className={styles.container}>
      <Header name="NewContent" />
      <div className={styles.imageAndInput}>
        <div className={styles.inputContainer}>
          <form>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="제목을 입력하세요"
              value={editedTitle}
              onChange={onEditChangeTitle}
            />
            <div className={styles.contentImage} style={{ display: "flex" }}>
              <textarea
                style={{ width: "900px" }}
                className={styles.inputContent}
                placeholder="내용을 입력하세요"
                onChange={onEditChangeContent}
                value={editedContent}
              />
            </div>
          </form>
        </div>
        <div className={styles.inputFileImageDiv}>
          {urlImg.length > 0 &&
            urlImg.map((url) =>
              url !== "" ? (
                <div className={styles.oneImage}>
                  <img src={url} />
                </div>
              ) : null
            )}
        </div>
      </div>

      <div className={styles.imageInputContainer}>
        <form className={styles.imageInputFileForm}>
          <input
            id="image_input"
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            name="profile_img"
            onChange={onChange}
          ></input>
          <label for="image_input">파일 선택</label>

          {/*    <input
          className={styles.upload_name}
          value={inputFileName}
          placeholder="첨부파일"
          maxLength={30}
          onChange={onChange}
        ></input> */}
        </form>
        <div>
          <button className={styles.imageButton} onClick={Submit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modify;
