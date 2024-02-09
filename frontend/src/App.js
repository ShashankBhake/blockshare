import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Particles from "./components/Particles";
import Home from "./pages/Home";
import { useState } from "react";
import React from 'react'

// Create context for account and contract
export const AccountContext = React.createContext({
  account: null,
  setAccount: () => {},
  contract: null,
  setContract: () => {}
});

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // Set up provider value with account and contract state
  const contextValue = {
    account,
    setAccount,
    contract,
    setContract
  };

  return (
    <BrowserRouter>
      <AccountContext.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Particles/>} />
        </Routes>
      </AccountContext.Provider>
    </BrowserRouter>
  );
};

export default App;
