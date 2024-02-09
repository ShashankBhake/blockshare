import { useEffect, useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        console.log("TRYING ", account)
        dataArray = await contract.display(account);
      }
    } catch (e) {
      console.error(e);
      alert("You don't have access");
    }
    console.log(dataArray)
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
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
  <p className="account-text">
    Account: {account ? account : "Not connected"}
  </p>
  <button className="center button" onClick={getdata}>
    Get Data
  </button>
</div>

    </>
  );
};
export default Display;
