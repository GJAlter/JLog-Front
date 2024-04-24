import axios from "axios";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ResType } from "../../Models/ResType";

const LoginDiv = styled.div`
    width: 500px;
    height: 500px;
    margin: auto;
    align-content: center;
    padding: 10px;

    p {
        font-size: 25px;
        margin-bottom: 20px;
    }

    div.input_box {
        width: 100%;
        height: 40px;
        text-align: center;

        input {
            padding-right: 0px;
            width: 100%;
            height: 100%;
        }
    }

    div.button_box {
        display: flex;
        justify-content: space-between;

        div.register {
            display: flex;
            align-items: center;
            cursor: pointer;
            color: #5d5d5d;

            p {
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 0;
            }
        }
    }
`;

const LoginPage = () => {
    const navigate = useNavigate();

    const [loginValue, setLoginValue] = useState<{ [key: string]: string }>({
        userId: "",
        password: "",
    });

    const onIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue((loginValue) => ({
            ...loginValue,
            userId: e.target.value,
        }));
    };

    const onPwChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue((loginValue) => ({
            ...loginValue,
            password: e.target.value,
        }));
    };

    const onRegisterClick = () => {
        navigate("/register");
    };

    const onLoginClick = () => {
        const formData = new FormData();
        Object.keys(loginValue).forEach((key) => formData.append(key, loginValue[key]));
        axios.post("/api/login", formData).then((res) => {
            const result = ResType.fromJson(res.data);
            if (result.statusCode == 200) {
                navigate("/");
            } else {
                alert(result.result);
            }
        });
    };

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code == "Enter") {
            onLoginClick();
        }
    };

    return (
        <LoginDiv>
            <p>Jlog에 오신것을 환영합니다.</p>
            <div className="input_box">
                <input type="text" value={loginValue.userId} onChange={onIdChange} onKeyDown={onInputKeyDown} placeholder="ID" />
            </div>
            <br />
            <div className="input_box">
                <input type="password" value={loginValue.password} onChange={onPwChange} onKeyDown={onInputKeyDown} placeholder="PW" />
            </div>
            <br />
            <div className="button_box">
                <div className="register">
                    <p className="register" onClick={onRegisterClick}>
                        회원가입
                    </p>
                </div>
                <input type="button" onClick={onLoginClick} value={"로그인"} />
            </div>
        </LoginDiv>
    );
};

export default LoginPage;
