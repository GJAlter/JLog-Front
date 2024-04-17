import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Posts } from '../../../Models/Posts';

const PostBox = styled.div`
    width: 85%;
    height: 170px;
    background-color: #F5F5F5;
    margin: auto;
    margin-bottom: 50px;
    border-radius: 14px;
    padding: 25px;

    div.title_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p.title {
        font-size: 35px;
        margin-bottom: 12px;
    }
    
    p.content {
        font-size: 20px;
        font-weight: 300;
        margin-top: 14px;
    }

    p.modified_date {
        color: #484848;
    }
`;

const Divider = styled.hr`
    width: 100%;
    color: #C2C2C2;
`;

interface Props {
    post: Posts
}

const PostItem = ({ post }: Props) => {

    return(
        <PostBox id={post.id}>
            <div className='title_box'>
                <p className='title'>{post.title}</p>
                <p className='modified_date'>{post.modifiedDatetime.toString().split("T")[0]}</p>
            </div>
            <Divider />
            <p className='content'>{post.contentPreview}</p>
        </PostBox>
    )
}

export default PostItem;