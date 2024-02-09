import React, { useState, useContext } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import filesAmongus from './filesAmongus.json';
import { AccountContext } from '../App';
import axios from 'axios';
import '../App.css'

const App = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const { account, setAccount, contract, setContract } = useContext(AccountContext);

    const particlesInit = async (main) => {
        await loadFull(main);
    };

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
                        pinata_api_key: "684f86043b34ba634754",
                        pinata_secret_api_key: '8600d8b5ae0b07f6ee2d500181536d980ffeeb322c20088e2363d7fe05335cd0',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response)
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                contract.add(account, ImgHash);
                alert('Successfully uploaded image');
                setFileName('No image selected');
                setFile(null);
            } catch (error) {
                alert('Unable to upload file');
            }
        }
    };

    return (
        <div className="App">
            <Particles id="tsparticles" init={particlesInit} options={filesAmongus} className="particles" />
            <div className="content">
                <h1 className="title">BlockShare</h1>
                <div className="upload-container">
                    <label htmlFor="file-upload" className="upload-button"  >
                        Choose Image
                    </label>
                    <input disabled={!account} type="file" id="file-upload" name="data" className="file-input" onChange={selectFile}/>
                    <span className="file-name">{!file ? 'No file selected' : fileName}</span>
                    <button type="submit" className="submit-button" disabled={!file || !account} onClick={handleSubmit}>
    Upload File
</button>
                </div>
            </div>
        </div>
    );
};

export default App;
