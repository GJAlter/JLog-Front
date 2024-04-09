import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from './Pages/Main/MainPage';
import PostPage from './Pages/Post/PostPage';
import Header from './Pages/Header';
import Template from './Template';



const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Template />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/post" element={<PostPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;