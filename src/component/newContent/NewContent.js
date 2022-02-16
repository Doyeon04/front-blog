import React from "react";
import styles from "./NewContent.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { token, URL as myURL } from "../Api";

const NewContent = (props) => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgUrl, setUrlImg] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeContent = (event) => setContent(event.target.value);
  const [inputFileName, setInputFileName] = useState("첨부 파일");

  console.log("title:", title);
  console.log("content:", content);

  const str = "https://blog-img-store2.s3.ap-northeast-2.amazonaws.com/";

  const submit = () => {
    var axios = require("axios");
    var data = JSON.stringify({
      content: fileUrl + "," + content,
      title: title,
    });

    var config = {
      method: "post",
      url: myURL + "posts",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));

    const img = e.target.files[0];

    setInputFileName(img.name);
    const formData = new FormData(); //이미지 객체
    formData.append("multipartFile", img); //이렇게 하면 인코딩 필요x

    return (
      axios
        .post(myURL + "img/s3/posts/upload", formData, {
          headers: {
            //formdata쓰려면 contentType 안써야 됨
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          //response로 날라와서
          setUrlImg([...imgUrl, res.data]);
        }) //이미지 전송 -> 로컬서버에 이미지파일 자체가 저장 -> s3에 올리기
        //이미지 ,파일을 저장,관리 s3 = storage3 저장고
        //s3에서 프론트에 다시 image url 전송
        .catch((err) => {
          alert("실패");
        })
    );
  };
  useEffect(() => {
    setFileUrl(imgUrl.join(" "));
  }, [imgUrl]);

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
              onChange={onChangeTitle}
            />
            <div className={styles.contentImage} style={{ display: "flex" }}>
              <textarea
                style={{ width: "900px" }}
                className={styles.inputContent}
                placeholder="내용을 입력하세요"
                onChange={onChangeContent}
              />
            </div>
          </form>
        </div>
        <div className={styles.inputFileImageDiv}>
          {imgUrl &&
            imgUrl.map((url) => (
              <div className={styles.oneImage}>
                <img src={url} />
              </div>
            ))}
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
          <button className={styles.imageButton} onClick={submit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContent;
