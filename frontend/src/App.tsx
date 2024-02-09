import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Remove useNavigate import
 
import "./App.css";
 
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
