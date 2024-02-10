import React, { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState([]);

  const handleCheckboxChange = (format) => {
    const index = selectedFormats.indexOf(format);
    if (index === -1) {
      setSelectedFormats([...selectedFormats, format]);
      
    } else {
      const updatedFormats = [...selectedFormats];
      updatedFormats.splice(index, 1);
      setSelectedFormats(updatedFormats);
    }
  };

  const imageExtensions = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "bmp",
    "webp",
    "svg",
    "tiff",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "bmp",
    "webp",
    "svg",
    "tiff",
  ];

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title-share">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
            <div className="checkbox-container">
              {imageExtensions.map((format) => (
                <label key={format} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(format)}
                    onChange={() => handleCheckboxChange(format)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  {format.toUpperCase()} {/* Display format in uppercase */}
                </label>
              ))}
            </div>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
