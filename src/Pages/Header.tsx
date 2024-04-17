import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { ResType } from '../Models/ResType';
import { useNavigate } from 'react-router-dom';

const HeaderDiv = styled.div`
    height: 113px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    p#user {
        margin-left: 50px;
        font-size: 20px;
        align-content: end;
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

    const [isSelected, setIsSelected] = useState("about");
    const [user, setUser] = useState("_")
    const [timer, setTimer] = useState(0);

    const checkUser = async () => {
        const res = await axios.get("/api/check");
        const result = ResType.fromJson(res.data);
        if(result.statusCode != 200) {
            navigate("/login");
            return;
        }
        if(user != result.result) {
            setUser(result.result);
        }
        if(timer > 100) {
            setTimer(0)
        } else {
            setTimer(timer + 1);
        }
    }

    useEffect(() => {
        checkUser();
    }, [])

    useEffect(() => {
        const loopCheck = setTimeout(async () => {
            checkUser();
        }, 30000);
        return () => clearTimeout(loopCheck);
    }, [timer]);

    const onLinkClick = (name: string) => {
        setIsSelected(name)
    }

    return(
        <div>
            <HeaderDiv>
                <p id='user'>어서오세요 {user}님</p>
                <LinkDiv>
                    <Link to="/" onClick={() => onLinkClick("about")}><p className={isSelected == "about" ? "selected": ""}>ABOUT</p></Link>
                    <Link to="/post" onClick={() => onLinkClick("post")}><p className={isSelected == "post" ? "selected": ""}>POSTS</p></Link>
                    <Link to="/discover" onClick={() => onLinkClick("discover")}><p className={isSelected == "discover" ? "selected": ""}>DISCOVER</p></Link>
                </LinkDiv>
            </HeaderDiv>
            <Divider />
        </div>
    );

}

export default Header;