import React, { useState } from 'react';
import { ethers } from 'ethers';
 // Import useHistory hook

interface ConnectWalletProps {
    setDetails: React.Dispatch<React.SetStateAction<string>>;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setDetails }) => {
    
    const requestAccount = async () => {
        console.log('Requesting account..');

        // Check if Metamask exists
        if (window.ethereum) {
            console.log('Metamask detected');

            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                console.log(accounts);
                setDetails(accounts[0]);

                // Redirect to another route after successful login
                // Replace '/dashboard' with your desired route
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('Metamask not detected');
        }
    };

    return (
        <div>
            <button className="space-button" onClick={requestAccount}>Connect Wallet</button>
        </div>
    );
};

export default ConnectWallet;
