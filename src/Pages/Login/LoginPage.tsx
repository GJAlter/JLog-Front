import React, { useState, useEffect } from 'react';
import styled from "styled-components";


const LoginPage = () => {

    const LoginDiv = styled.div`
        width: 500px;
        height: 500px;
        border: 1px solid #000;
        margin: auto;
        align-content: center;
        
        p {
            font-size: 25px;
            margin-bottom: 20px;
        }
        
        input[type=text] {
            width: 95%;
            height: 40px;
            margin: auto;
            margin-bottom: 10px;
        }
    `;


    return (
        <LoginDiv>
            <p>Jlog에 오신것을 환영합니다.</p>
            <input type='text' placeholder='ID' />
            <br />
            <input type='text' placeholder='PW' />
            <br />
            <input type='button' value={"Login"}/>
            
        </LoginDiv>
    )
}

export default LoginPage;