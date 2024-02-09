// ConnectWallet.tsx
import React from 'react';

const ConnectWallet = ({ setDetails }) => {
    const ethereum = (window).ethereum;

    const requestAccount = async () => {
        console.log('Requesting account..');

        // Check if Metamask exists
        if (ethereum) {
            console.log('Metamask detected');

            try {
                const accounts = await ethereum.request({
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
