import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ethers } from "ethers";
import { Dapp } from "./components/Dapp";
import "bootstrap/dist/css/bootstrap.css";

// สมมติว่า ABI และ address ของ contract ถูกเก็บในไฟล์แยก
import { abi, contractAddress } from "./contracts/Token";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const initProvider = async () => {
      // ตรวจสอบว่า MetaMask เชื่อมต่ออยู่หรือไม่
      if (window.ethereum) {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        // ขอให้ผู้ใช้เชื่อมต่อบัญชี MetaMask
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initProvider();
  }, []);

  return (
    <div className="container mt-5">
      <h1>My DApp</h1>
      <p>Connected Account: {account}</p>
      <Dapp provider={provider} signer={signer} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
