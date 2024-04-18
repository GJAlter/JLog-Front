// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { ResType } from '../../Models/ResType';
import { Page } from '../../Models/Page';
import { Posts } from '../../Models/Posts';
import PostItem from './Components/PostItem';
import { useNavigate } from 'react-router-dom';

const PostPageBox = styled.div`
  height: 100%;
  padding-top: 21px;
  padding-left: 125px;
  padding-right: 125px;

  div.new_post {
    width: 135px;
    height: 40px;
    margin-left: auto;
    margin-bottom: 21px;
    border: 1px solid #C6C6C6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
      box-shadow: inset 1.5px 1.5px rgb(0, 0, 0, 0.2);
    }

    p {
      font-size: 18px;
      font-weight: 500;
    }

    img {
      width: 26px;
      height: 26px;
      margin-left: 5px;
    }
  }
`

const PostPage = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState<Array<Posts>>([]);

  useEffect(() => {
    axios.get("/api/posts/my").then(res => {
      const result = ResType.fromJson(res.data);
      if(result.statusCode == 200) {
        const page = Page.fromJson(result.result);

        setPosts(page.data.map(item => Posts.fromJson(item)));
      }
    })
  }, []);

  const onNewPostClick = () => {
    navigate("/post/new");
  }

  return (
    <PostPageBox>
      <div className='new_post' onClick={onNewPostClick}>
        <p className='new_post'>New Post</p>
        <img src="imgs/edit.png" alt="new_post" />
      </div>
      {posts.map(item => {
        return (
          <PostItem key={item.id} post={item}/>
      )
      })}
    </PostPageBox>
  );
};

export default PostPage;
