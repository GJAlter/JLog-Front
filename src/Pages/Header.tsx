import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ResType } from "../Models/ResType";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderDiv = styled.div`
    height: 113px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    div.user {
        display: flex;
        align-items: end;
        p#user {
            margin-left: 50px;
            font-size: 20px;
        }
        img {
            width: 18px;
            height: 18px;
            margin-left: 10px;
            margin-bottom: 2px;
            cursor: pointer;
        }
    }
`;

const LinkDiv = styled.div`
    display: flex;
    gap: 74px;
    margin-right: 74px;
    align-items: center;
    p {
        font-size: 25px;
    }

    p.selected {
        font-weight: 600;
    }
`;

const Divider = styled.hr`
    width: 95%;
`;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isSelected, setIsSelected] = useState("about");
    const [user, setUser] = useState("_");
    const [timer, setTimer] = useState(0);

    const checkUser = async () => {
        const res = await axios.get("/api/check");
        const result = ResType.fromJson(res.data);
        if (result.statusCode != 200) {
            navigate("/login");
            return;
        }
        if (user != result.result) {
            setUser(result.result);
        }
        if (timer > 100) {
            setTimer(0);
        } else {
            setTimer(timer + 1);
        }
    };

    useEffect(() => {
        checkUser();
        if (location.pathname.match(/(^\/post|^\/post.*)/g)) {
            setIsSelected("post");
        }
    }, []);

    useEffect(() => {
        const loopCheck = setTimeout(async () => {
            checkUser();
        }, 30000);
        return () => clearTimeout(loopCheck);
    }, [timer]);

    const onLinkClick = (name: string) => {
        setIsSelected(name);
    };

    const onLogoutClick = () => {
        axios.post("/api/logout").then((_) => {
            navigate("/login");
        });
    };

    return (
        <div>
            <HeaderDiv>
                <div className="user">
                    <p id="user">어서오세요 {user}님</p>
                    <img src={`${process.env.PUBLIC_URL}/imgs/logout.svg`} alt="logout" onClick={onLogoutClick} />
                </div>
                <LinkDiv>
                    <Link to="/" onClick={() => onLinkClick("about")}>
                        <p className={isSelected == "about" ? "selected" : ""}>ABOUT</p>
                    </Link>
                    <Link to="/post" onClick={() => onLinkClick("post")}>
                        <p className={isSelected == "post" ? "selected" : ""}>POSTS</p>
                    </Link>
                    {/* <Link to="/discover" onClick={() => onLinkClick("discover")}><p className={isSelected == "discover" ? "selected": ""}>DISCOVER</p></Link> */}
                </LinkDiv>
            </HeaderDiv>
            <Divider />
        </div>
    );
};

export default Header;
