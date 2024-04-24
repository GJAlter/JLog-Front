// src/components/Blog.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import { ResType } from "../../Models/ResType";

const NotionItemDiv = styled.div`
    margin: auto;
    margin-top: 30px;
    padding: 10px;
    display: flex;
    align-items: center;
    width: max-content;
    border: 1px solid #c1c1c1;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
        background-color: #c1c1c1;
    }

    img {
        width: 48px;
        heigth: 48px;
    }

    p {
        margin-left: 15px;
        font-size: 25px;
        font-weight: 600;
    }
`;

const NotionDiv = styled.div`
    .notion-page {
        margin-top: 0;
    }
`;

const MainPage = () => {
    const [notionResponse, setNotionResponse] = useState({});
    const [notionId, setNotionId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/notion").then((res) => {
            const result = ResType.fromJson(res.data);
            setNotionId(result.result);
            axios.get(`https://notion-api.splitbee.io/v1/page/${result.result}`).then(({ data }) => {
                setNotionResponse(data);
            });
        });
    }, []);

    useEffect(() => {
        axios.get("/api/check").then((res) => {
            const result = ResType.fromJson(res.data);
            if (result.statusCode != 200) {
                navigate("/login");
            }
        });
    }, []);

    const onNotionClick = () => {
        window.open(`https://axiomatic-sociology-ae7.notion.site/${notionId}`, "_blank", "noopener, noreferrer");
    };

    return (
        <div>
            <NotionItemDiv onClick={onNotionClick}>
                <img src={`${process.env.PUBLIC_URL}/imgs/notion.png`} alt="notion_link" />
                <p>Notion</p>
            </NotionItemDiv>
            {
                <NotionDiv>
                    <NotionRenderer blockMap={notionResponse} fullPage={true} hideHeader={true} />
                </NotionDiv>
            }
        </div>
    );
};

export default MainPage;
