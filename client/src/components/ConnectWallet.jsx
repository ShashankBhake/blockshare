import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import { ethers } from 'ethers';
 import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
 
 const ConnectWallet = ({ setDetails }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider)
    const { setAddress, setContract } = useContext(MyContext);

    const requestAccount = async () => {
        console.log('Requesting account..');

        
        if (window.Ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
               const add = await provider.getSigner()
               setAddress(add)
               console.log(add)
            })
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    };

    return (
        <div>
            <button className="space-button" onClick={requestAccount}>Connect Wallet</button>
        </div>
    );
};

export default ConnectWallet;
