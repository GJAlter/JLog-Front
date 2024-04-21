import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { ResType } from "../../Models/ResType";

interface Props {
    isIdError: boolean;
    isPasswordError: boolean;
    isNicknameError: boolean;
}

const Register = styled.div<Props>`
    width: 50%;
    height: 70%;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 100px;
    border: 1px solid black;
    padding: 25px;

    div.line {
        width: 100%;
        float: left;
        justify-content: space-between;
        padding: 5px;
        margin-bottom: 20px;

        p {
            font-size: 10px;
        }
        input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #636363;
            font-size: 14px;
        }

        p.error {
            display: none;
            color: red;
        }

        input:focus {
            outline-width: 0;
            border-bottom: 1px solid #999999;
        }
    }

    ${(props) => {
        let classNames = "";
        if (props.isIdError) classNames += "div.line.id";
        if (props.isPasswordError) {
            if (classNames.length > 0) {
                classNames += ", ";
            }
            classNames += "div.line.pw, div.line.pw_confirm";
        }
        if (props.isNicknameError) {
            if (classNames.length > 0) {
                classNames += ", ";
            }
            classNames += "div.line.nickName";
        }
        return classNames;
    }} {
        p {
            color: red;
        }

        input {
            border-bottom: 1px solid red;
        }

        input:focus {
            border-bottom: 1px solid red;
        }

        p.error {
            display: block;
        }
    }

    div.register {
        input {
            width: 100%;
            font-size: 14px;
        }
    }
`;

const RegisterPage = () => {
    const [isIdError, setIdError] = useState(false);
    const [isPwError, setPwError] = useState(false);
    const [isNicknameError, setNicknameError] = useState(false);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [notion, setNotion] = useState("");

    const onIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const onIdBlur = (e: ChangeEvent<HTMLInputElement>) => {
        axios.get(`/api/duplicate?id=${id}`).then((res) => {
            const result = ResType.fromJson(res.data);
            setIdError(result.statusCode != 200);
        });
    };

    const onPwChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
    };

    const onConfirmPwChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPw(e.target.value);
    };

    const onPwBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setPwError(pw != confirmPw);
    };

    const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const onNotionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNotion(e.target.value);
    };

    return (
        <Register isIdError={isIdError} isPasswordError={isPwError} isNicknameError={isNicknameError}>
            <div className="line id">
                <p className="id">아이디</p>
                <input type="text" className="id" value={id} onChange={onIdChange} onBlur={onIdBlur} />
                <p className="error">아이디가 중복되었습니다.</p>
            </div>
            <div className="line pw">
                <p className="pw">비밀번호</p>
                <input type="password" className="pw" value={pw} onChange={onPwChange} onBlur={onPwBlur} />
            </div>
            <div className="line pw_confirm">
                <p className="pw_confirm">비밀번호 확인</p>
                <input type="password" className="pw_confirm" value={confirmPw} onChange={onConfirmPwChange} onBlur={onPwBlur} />
                <p className="error">비밀번호가 다릅니다.</p>
            </div>
            <div className="line nickname">
                <p className="nickname">닉네임</p>
                <input type="text" className="nickname" value={nickname} onChange={onNicknameChange} />
                <p className="error">닉네임이 중복되었습니다.</p>
            </div>
            <div className="line notion">
                <p className="notion">Notion</p>
                <input type="text" className="notion" value={notion} onChange={onNotionChange} />
            </div>
            <div className="register">
                <input type="button" value={"회원가입"} />
            </div>
        </Register>
    );
};

export default RegisterPage;
