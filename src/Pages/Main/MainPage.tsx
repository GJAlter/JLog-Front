// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import { NotionAPI } from 'notion-client';


const MainPage = () => {

  useEffect(() => {
    const getNotion = async () => {
      const notion = new NotionAPI();
      // const recordMap = await notion.getPage("b72a5a41d2724c5aad2cc9d2886fe139"); 
    }
  }, []);

  return (
    <div></div>
  );
};

export default MainPage;
