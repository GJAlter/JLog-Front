import React, { useState, useEffect } from 'react';
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

    return(
        <>
            <HeaderDiv>
                <p id='user'>어서오세요 OOO님</p>
                <LinkDiv>
                    <p className='selected'>ABOUT</p>
                    <p>POSTS</p>
                    <p>DISCOVER</p>
                </LinkDiv>
            </HeaderDiv>
            <Divider />
        </>
    )

}

export default Header;