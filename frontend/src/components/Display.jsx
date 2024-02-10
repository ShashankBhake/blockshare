import { useEffect, useState } from "react";
import "./Display.css";
import axios from "axios";
// const sdk = require("api")("@pinata-cloud");

const response = await axios.get(
    "https://api.pinata.cloud/data/pinList?includeCount=false&pageLimit=1000",
    {
        headers: {
            accept: "application/json",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Zjk1MzRiMC00YTAzLTQ5ZDctODQzMC03MjdkNzU1MDg3NGEiLCJlbWFpbCI6InNoYXNoYW5rYmhha2UxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijg0MGMyMGFlYjZjYWZlMzVlNGY3Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDgxODQ3ZDRlNDgyYzdiYTA3MzRkM2RhNjE1MmIyOGNmYzM4OTJiZmZlOWFiZDkxOTlmZTlkNTYyZDZlNjc2OCIsImlhdCI6MTcwNzUwODM5OH0.vh6C4o6XAR65NVJQDueH6YE-ybSvZD-WFvLDbU9i4f8",
        },
    }
);

function classifyFile(fileType) {
    const imageExtensions = [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "bmp",
        "webp",
        "svg",
        "tiff",
    ];
    const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
    const videoExtensions = [
        "mp4",
        "avi",
        "mkv",
        "mov",
        "wmv",
        "flv",
        "webm",
        "mpeg",
    ];
    const documentExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "txt",
        "rtf",
        "csv",
        "odt",
        "ods",
        "odp",
    ];
    const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"];
    const codeExtensions = [
        "html",
        "css",
        "js",
        "json",
        "xml",
        "cpp",
        "c",
        "java",
        "py",
        "rb",
        "php",
        "sql",
        "pl",
    ];
    const executableExtensions = [
        "exe",
        "msi",
        "deb",
        "dmg",
        "app",
        "bat",
        "sh",
    ];

    const extension = fileType.toLowerCase();

    if (imageExtensions.includes(extension)) {
        return "image";
    } else if (audioExtensions.includes(extension)) {
        return "audio";
    } else if (videoExtensions.includes(extension)) {
        return "video";
    } else if (documentExtensions.includes(extension)) {
        return "document";
    } else if (archiveExtensions.includes(extension)) {
        return "archive";
    } else if (codeExtensions.includes(extension)) {
        return "code";
    } else if (executableExtensions.includes(extension)) {
        return "executable";
    } else {
        return "unknown";
    }
}

const Display = ({ contract, account }) => {
    const [data, setData] = useState("");
    const getdata = async () => {
        let dataArray;
        const Otheraddress = document.querySelector(".address").value;
        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
            } else {
                console.log("TRYING ", account);
                dataArray = await contract.display(account);
            }
        } catch (e) {
            console.error(e);
            alert("You don't have access");
        }
        console.log(dataArray);
        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            // fetching metadata from pinata
            const arr = await response;
            // console.log("arr: ", arr);
            const rows = arr.data.rows;
            // console.log("rows: ", rows.length);

            // dataArray.push();
            const str = dataArray.toString();
            const str_array = str.split(",");
            const obj = {};
            str_array.forEach((url, index) => {
                const id = index;
                const cid = url.split("/").pop();
                const rows = arr.data.rows;
                let ext = "";
                let name = "";
                rows.forEach((row) => {
                    if (row.ipfs_pin_hash === cid && row.metadata.name !== "") {
                        url = row.ipfs_pin_hash;
                        name = row.metadata.name;
                        ext = row.metadata.name.split(".").pop();
                    }
                });

                if (!obj[id]) {
                    obj[id] = {};
                }
                // if (!obj[id]["url"]) {
                //     obj[id]["url"] = [];
                // }

                // if (!obj[id]["cid"]) {
                //     obj[id]["cid"] = [];
                // }
                // if (!obj[id]["cid"]) {
                //     obj[id]["cid"] = [];
                // }

                obj[id]["url"] = "https://gateway.pinata.cloud/ipfs/" + url;
                obj[id]["cid"] = cid;
                obj[id]["name"] = name;
                obj[id]["type"] = classifyFile(ext);
                // obj[id]["type"] = ext;
            });
            console.log("obj: ", obj);

            // console.log("str: ", str);
            // console.log("str_array ", str_array);
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">
                        <img
                            key={i}
                            src={item}
                            alt="new"
                            className="image-list"
                        ></img>
                    </a>
                );
            });
            setData(images);
        } else {
            alert("No image to display");
        }
    };

    // useEffect(() => {
    //   getdata();
    // })
    return (
        <>
            <div className="container">
                <div className="list">
                    {/* Render your image data here */}
                    {data}
                </div>
                <input
                    type="text"
                    placeholder="Enter Address"
                    className="address"
                />
                <p className="account-text" style={{ color: "white" }}>
                    Your Address: {account ? account : "Not connected"}
                </p>
                <button className="center button" onClick={getdata}>
                    Get Data
                </button>
            </div>
        </>
    );
};
export default Display;
