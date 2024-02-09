import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Particles from "./components/Particles";
import Particles from 'react-tsparticles';
import Home from "./pages/Home";
import Upload from "./components/Upload";
import { useState } from "react";
import React from 'react'
import { loadFull } from 'tsparticles';
import filesAmongus from './components/filesAmongus.json';

// Create context for account and contract
export const AccountContext = React.createContext({
  account: null,
  setAccount: () => { },
  contract: null,
  setContract: () => { }
});

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  // QmZeTCWJHFMT7BB54R6UejcY6VyyQa12VgyeoLAQ3GXsJo
  // Set up provider value with account and contract state
  const contextValue = {
    account,
    setAccount,
    contract,
    setContract
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <BrowserRouter>
      <AccountContext.Provider value={contextValue}>
      <Particles id="tsparticles" init={particlesInit} options={filesAmongus} className="particles" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Upload />} />
        </Routes>
      </AccountContext.Provider>
    </BrowserRouter>
  );
};

export default App;
