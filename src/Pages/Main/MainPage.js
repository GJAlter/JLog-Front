// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from './Components/BlogPost';
import Pagination from './Components/Pagination';

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>My Blog</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {currentPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
