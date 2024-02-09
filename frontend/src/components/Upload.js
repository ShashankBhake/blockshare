import React, { useState, useContext, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import filesAmongus from './filesAmongus.json';
import { AccountContext } from '../App';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import Display from './Display';
import Modal from "./Modal";

const App = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);


    const { account, setAccount, contract, setContract } = useContext(AccountContext);

    const particlesInit = async (main) => {
        await loadFull(main);
    };

    useEffect(() => {
        if (!account) {
            navigate('/')
        }
    }, [account])

    const selectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const data = e.target.files[0];
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(data);
            reader.onloadend = () => {
                setFile(e.target.files[0]);
            };
            setFileName(e.target.files[0].name);
        }
        e.preventDefault();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios({
                    method: 'post',
                    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
                    data: formData,
                    headers: {
                        pinata_api_key: "840c20aeb6cafe35e4f7",
                        pinata_secret_api_key: '481847d4e482c7ba0734d3da6152b28cfc3892bffe9abd9199fe9d562d6e6768',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response)
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                await contract.add(account, ImgHash);
                alert('Successfully uploaded image');
                setFileName('No image selected');
                setFile(null);
            } catch (error) {
                alert('Unable to upload file');
            }
        }
    };
    console.log(`account: ${account}`)
    return (
        <>
            {!modalOpen && (
                <button className="share" onClick={() => setModalOpen(true)}>
                    Share
                </button>
            )}

            {modalOpen && (
                <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
            )}
            <div className="App">
                {/* <Particles id="tsparticles" init={particlesInit} options={filesAmongus} className="particles" /> */}
                <div className="content">
                    <h1 className="title">BlockShare</h1>
                    <div className="upload-container">
                        <label htmlFor="file-upload" className="upload-button"  >
                            Choose Image
                        </label>
                        <input disabled={!account} type="file" id="file-upload" name="data" className="file-input" onChange={selectFile} />
                        <span className="file-name">{!file ? 'No file selected' : fileName}</span>
                        <button type="submit" className="submit-button" disabled={!file || !account} onClick={handleSubmit}>
                            Upload File
                        </button>
                    </div>
                </div>
                <Display contract={contract} account={account}></Display>
            </div>
        </>
    );
};

export default App;
