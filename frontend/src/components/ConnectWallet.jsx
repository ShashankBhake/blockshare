import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import { AccountContext } from '../App';
import Upload from '../artifacts/contracts/Upload.sol/Upload.json';
import './ConnectWallet.css';
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

                const contractAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
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
            <button
                className="space-button"
                onClick={requestAccount}
            >
                Connect Wallet
            </button>
            {/* <button className="space-button" onClick={requestAccount}>Connect Wallet</button> */}
        </div>
    );
};

export default ConnectWallet;
