import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { ResType } from "../../Models/ResType";
import { useNavigate } from "react-router-dom";

interface Props {
    isError: {
        id: boolean;
        pw: boolean;
        nickname: boolean;
        notion: boolean;
    };
}

const Register = styled.div<Props>`
    width: 20%;
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
        if (props.isError.id) classNames += "div.line.id";
        if (props.isError.pw) {
            if (classNames.length > 0) {
                classNames += ", ";
            }
            classNames += "div.line.pw, div.line.pw_confirm";
        }
        if (props.isError.nickname) {
            if (classNames.length > 0) {
                classNames += ", ";
            }
            classNames += "div.line.nickname";
        }
        if (props.isError.notion) {
            if (classNames.length > 0) {
                classNames += ", ";
            }
            classNames += "div.line.notion";
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
    const navigate = useNavigate();

    const [isError, setError] = useState({
        id: false,
        pw: false,
        nickname: false,
        notion: false,
    });
    const [errorMessage, setErrorMessage] = useState({
        id: "아이디가 중복되었습니다.",
        pw: "비밀번호가 일치하지 않습니다.",
        nickname: "닉네임이 중복되었습니다.",
        notion: "노션 링크가 잘못되었습니다.",
    });
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [notion, setNotion] = useState("");

    const setErrorValue = (data: { [key: string]: boolean }) => {
        const key = Object.keys(data)[0];
        setError((error) => ({ ...error, [key]: data[key] }));
    };

    const setErrorMessageValue = (data: { [key: string]: string }) => {
        const key = Object.keys(data)[0];
        setErrorMessage((msg) => ({ ...msg, [key]: data[key] }));
    };

    const onIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        setErrorValue({ id: false });
    };

    const onIdBlur = (e: ChangeEvent<HTMLInputElement>) => {
        axios.get(`/api/duplicate?id=${id}`).then((res) => {
            const result = ResType.fromJson(res.data);
            setErrorValue({ id: result.statusCode != 200 });
            setErrorMessageValue({ id: "아이디가 중복되었습니다." });
        });
    };

    const onPwChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value);
        if (pw.length > 0 && confirmPw.length > 0) {
            setErrorValue({ pw: e.target.value != confirmPw });
            setErrorMessageValue({ pw: "비밀번호가 일치하지 않습니다." });
        }
    };

    const onConfirmPwChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPw(e.target.value);
        if (pw.length > 0 && confirmPw.length > 0) {
            setErrorValue({ pw: pw != e.target.value });
            setErrorMessageValue({ pw: "비밀번호가 일치하지 않습니다." });
        }
    };

    const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        setErrorValue({ nickname: false });
    };

    const onNicknameBlur = (e: ChangeEvent<HTMLInputElement>) => {
        axios.get(`/api/duplicate?nickname=${nickname}`).then((res) => {
            const result = ResType.fromJson(res.data);
            setErrorValue({ nickname: result.statusCode != 200 });
            setErrorMessageValue({ nickname: "닉네임이 중복되었습니다." });
        });
    };

    const onNotionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNotion(e.target.value);
        setErrorValue({ notion: false });
    };

    const onRegisterClick = () => {
        let isFailed = false;
        if (id.length < 1) {
            setErrorMessageValue({ id: "아이디를 입력해주세요." });
            setErrorValue({ id: true });

            isFailed = true;
        }

        if (pw.length < 1 || confirmPw.length < 1) {
            setErrorMessageValue({ pw: "비밀번호를 입력해주세요." });
            setErrorValue({ pw: true });

            isFailed = true;
        }

        if (nickname.length < 1) {
            setErrorMessageValue({ nickname: "닉네임을 입력해주세요." });
            setErrorValue({ nickname: true });

            isFailed = true;
        }

        if (notion.length < 1) {
            setErrorMessageValue({ notion: "노션 링크 ID를 입력해주세요." });
            setErrorValue({ notion: true });

            isFailed = true;
        }

        if (isFailed) return;
        console.log(isError);
        if (isError.id || isError.pw || isError.nickname || isError.notion) return;

        const data = {
            id: id,
            password: pw,
            nickname: nickname,
            notion: notion,
        };

        axios.post("/api/register", JSON.stringify(data), { headers: { "Content-Type": "application/json" } }).then((res) => {
            const result = ResType.fromJson(res.data);
            console.log(result);
            if (result.statusCode == 200) {
                alert("회원가입이 완료되었습니다.\n다시 로그인 해주세요.");
                navigate("/login");
            }
        });
    };

    return (
        <Register isError={isError}>
            <div className="line id">
                <p className="id">아이디</p>
                <input type="text" className="id" value={id} onChange={onIdChange} onBlur={onIdBlur} />
                <p className="error">{errorMessage.id}</p>
            </div>
            <div className="line pw">
                <p className="pw">비밀번호</p>
                <input type="password" className="pw" value={pw} onChange={onPwChange} />
            </div>
            <div className="line pw_confirm">
                <p className="pw_confirm">비밀번호 확인</p>
                <input type="password" className="pw_confirm" value={confirmPw} onChange={onConfirmPwChange} />
                <p className="error">{errorMessage.pw}</p>
            </div>
            <div className="line nickname">
                <p className="nickname">닉네임</p>
                <input type="text" className="nickname" value={nickname} onChange={onNicknameChange} onBlur={onNicknameBlur} />
                <p className="error">{errorMessage.nickname}</p>
            </div>
            <div className="line notion">
                <p className="notion">Notion</p>
                <input type="text" className="notion" value={notion} onChange={onNotionChange} />
                <p className="error">{errorMessage.notion}</p>
            </div>
            <div className="register">
                <input type="button" value={"회원가입"} onClick={onRegisterClick} />
            </div>
        </Register>
    );
};

export default RegisterPage;
