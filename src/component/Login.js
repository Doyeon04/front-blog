import Header from './header/Header.js';
import TitleBox from './titleBox/TitleBox.js';
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const LoginForm = styled.form`
    postion:absolute;
    top:100px;
    
`;
function Login(){
    const [id,setId]=useState();
    const [ps,setPs]=useState();

    const replySubmit = (event)=>{
        event.preventDefault();
        var axios = require('axios');
        var data = JSON.stringify({
        "email": id,
        "password": ps
        });
    
        var config = {
        method: 'post',
        url: 'http://localhost:8080/api/auth/signin',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(JSON.stringify(response.data.token)){
            window.location.href="/";
        }
        })
        .catch(function (error) {
        console.log(error);
    });
        setId("");
        setPs("");
        //만약 정보가 같다면 HOME으로 이동해서 보여주기
        //다르다면 알림창 띄우기 
        
    }
    const handleSubmitId=(event)=>{
        setId(event.currentTarget.value);
    }
    const handleSubmitPs=(event)=>{
        setPs(event.currentTarget.value);
    }
return(
    <div>
        <LoginForm>
            ID:<input value={id || ''} onChange={handleSubmitId} type="text" />
            PS:<input value={ps || ''} onChange={handleSubmitPs} type="text" />
            <button onClick={replySubmit}>submit</button>
        </LoginForm>
        
    </div>


);
}
export default Login;