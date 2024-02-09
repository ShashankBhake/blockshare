import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Remove useNavigate import
import ParticleBg from "./components/ParticleBg";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Home from "./pages/Home";
import Upload from './components/Upload';

const App: React.FC = () => {
  

  return (
    <BrowserRouter> {/* Wrap your entire application with BrowserRouter */}
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Upload/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
