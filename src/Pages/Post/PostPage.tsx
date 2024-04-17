// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { ResType } from '../../Models/ResType';
import { Page } from '../../Models/Page';
import { Posts } from '../../Models/Posts';
import PostItem from './Components/PostItem';

const PostPageBox = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 82px;
`

const PostPage = () => {

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

  return (
    <PostPageBox>
      {posts.map(item => {
        return (
          <PostItem key={item.id} post={item}/>
      )
      })}
    </PostPageBox>
  );
};

export default PostPage;
