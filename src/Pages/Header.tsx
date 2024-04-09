import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

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

    const [isSelected, setIsSelected] = useState("about");

    const onLinkClick = (name: string) => {
        setIsSelected(name)
    }

    return(
        <div>
            <HeaderDiv>
                <p id='user'>어서오세요 OOO님</p>
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