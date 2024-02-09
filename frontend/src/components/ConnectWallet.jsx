import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import Upload from '../artifacts/contracts/Upload.sol/Upload.json';
import { AccountContext } from '../App';
const ConnectWallet = ({setDetails}) => {
    // const [account, setAccount] = useState('');
    // const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const {  setAccount, setContract } = useContext(AccountContext);
    const requestAccount = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                window.ethereum.on('chainChanged', () => window.location.reload());
                window.ethereum.on('accountsChanged', () => window.location.reload());

                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
                const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
                setContract(contract);
                setProvider(provider);
                setDetails(address)
            } else {
                throw new Error('Metamask is not installed');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    return (
        <div>
            <button className="space-button" onClick={requestAccount}>Connect Wallet</button>
        </div>
    );
};

export default ConnectWallet;
