import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

const Upload = () => {
  const { address } = useContext(MyContext);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  useEffect(() => {
    function refresh() {
      console.log(address);
    }

    refresh();
  }, [address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your file upload logic goes here
  };

  return (
    <div className="upload">
      Wallet Address: {address}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="file-upload-button"
          name="data"
          // onChange={uploadFile}
        />
      </form>
      <button className="upload-btn">Upload File</button>
    </div>
  );
};

export default Upload;
