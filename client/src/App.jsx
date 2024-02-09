import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './components/Upload';
import { MyContext } from './MyContext';
import './App.css';

const App = () => {
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState('');

  return (
    <BrowserRouter>
      <MyContext.Provider value={{ address, setAddress, account, setAccount, contract, setContract }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Upload />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
