import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AccountContext } from "../App";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import "./ConnectWallet.css";
const ConnectWallet = ({ setDetails }) => {
    // const [account, setAccount] = useState('');
    // const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const { setAccount, setContract } = useContext(AccountContext);
    const requestAccount = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                window.ethereum.on("chainChanged", () =>
                    window.location.reload()
                );
                window.ethereum.on("accountsChanged", () =>
                    window.location.reload()
                );

                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                const contractAddress =
                    "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
                const contract = new ethers.Contract(
                    contractAddress,
                    Upload.abi,
                    signer
                );
                setContract(contract);
                setProvider(provider);
                setDetails(address);
            } else {
                throw new Error("Metamask is not installed");
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    return (
        <div>
            <button className="space-button" onClick={requestAccount}>
                Connect Wallet 
                <div className="star-1">
                    {
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
                        viewBox="0 0 784.11 815.53"
                    >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                            <path
                                className="fil0"
                                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                            ></path>
                        </g>
                    </svg>
                      }
                </div>
                <div className="star-2">
                    {
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
                        viewBox="0 0 784.11 815.53"
                    >
                        <defs></defs>
                        <g id="Layer_x0020_1">
                            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                            <path
                                className="fil0"
                                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                            ></path>
                        </g>
                    </svg>
                   }
                </div>

                <div className="star-3">
                    {
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
        viewBox="0 0 784.11 815.53"
    >
        <defs></defs>
        <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
        </g>
    </svg>
}
</div>
<div className="star-4">{
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
        viewBox="0 0 784.11 815.53"
    >
        <defs></defs>
        <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
        </g>
    </svg>
}
</div>

<div className="star-5">{
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
        viewBox="0 0 784.11 815.53"
    >
        <defs></defs>
        <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
        </g>
    </svg>
}
</div>
<div className="star-6">
    {
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }}
        viewBox="0 0 784.11 815.53"
    >
        <defs></defs>
        <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"></metadata>
            <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            ></path>
        </g>
    </svg>
}
</div>

</button>
</div>
);
}

export default ConnectWallet;
