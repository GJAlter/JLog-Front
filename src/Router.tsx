import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from './Pages/Main/MainPage';



const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;