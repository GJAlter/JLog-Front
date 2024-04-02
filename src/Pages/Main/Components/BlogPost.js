// src/components/BlogPost.js
import React from 'react';

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default BlogPost;
