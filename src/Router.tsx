import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom"
import MainPage from './Pages/Main/MainPage';
import PostPage from './Pages/Post/PostPage';
import Header from './Pages/Header';
import Template from './Template';
import LoginPage from './Pages/Login/LoginPage';
import PostDetailPage from './Pages/Post/PostDetailPage';
import PostEditPage from './Pages/Post/PostEditPage';



const Router = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<Template />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/post" element={<PostPage />} />
                    <Route path="/post/:id" element={<PostDetailPage />} />
                    <Route path="/post/new" element={<PostEditPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default Router;