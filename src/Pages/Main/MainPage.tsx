// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import 'react-notion/src/styles.css';
import { NotionRenderer } from 'react-notion';


const MainPage = () => {

  const NotionItemDiv = styled.div`
    margin: auto;
    margin-top: 30px;
    padding: 10px;
    display: flex;
    align-items: center;
    width: max-content;
    border: 1px solid #C1C1C1;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      background-color: #C1C1C1;
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
  `

  const [notionResponse, setNotionResponse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getNotion = async () => {
      const NOTION_ID = "b72a5a41d2724c5aad2cc9d2886fe139";
      axios.get(`https://notion-api.splitbee.io/v1/page/${NOTION_ID}`).then(({data}) => {
        setNotionResponse(data);
      });
    }
    getNotion();
  }, []);

  useEffect(() => {
    navigate("/login");
  }, [])

  const onNotionClick = () => {
    window.open("https://axiomatic-sociology-ae7.notion.site/b72a5a41d2724c5aad2cc9d2886fe139", "_blank", "noopener, noreferrer")
  }

  return (
    <div>
      <NotionItemDiv onClick={onNotionClick}>
        <img src={"http://localhost:3000/imgs/notion.png"} title="notion_link" />
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
