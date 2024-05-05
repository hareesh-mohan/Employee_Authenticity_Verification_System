import React, { useState,useEffect } from 'react';
// import './companydash.css';
import { v4 as uuidv4 } from 'uuid';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function CompanyDash() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    metamask: "NOT CONNECTED to Metamask",
    contract: "NOT CONNECTED to Smart Contract",
  });
  const [verifyResult, setVerifyResult] = useState("");
  useEffect(() => {
    connectContract();
  });



  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setConnectionStatus({
        ...connectionStatus,
        metamask: `Account is: ${accounts[0]}`,
      });
    }
  };

  const connectContract = async () => {
    //ABI and address provided externally
    window.web3 = await new Web3(window.ethereum);
    const contractInstance = new window.web3.eth.Contract(ABI, Address);
    setContract(contractInstance);
    setConnectionStatus({
      ...connectionStatus,
      contract: "Connection Status: Success",
    });
  };

  const verifyDoc = async () => {
    const userhash = document.getElementById("verifyuserhash").value;
    const dochash = document.getElementById("verifydochash").value;
    console.log(userhash)
    console.log(dochash)
    const is_verified = await contract.methods
      .verifyDocument(userhash, dochash)
      .call();
    if (is_verified){

      setVerifyResult(`Verification SUCCESSFUL`);
    }else{
      setVerifyResult(`Verification FAILED!!!`);
    }
  };

  const addDoc = async () => {
    const userhash = document.getElementById("adduserhash").value;
    const dochash = document.getElementById("adddochash").value;
    await contract.methods
      .addDocument(userhash, dochash)
      .send({ from: account });
  };

  return (
    <div className="company-dash">
      {/* <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
            <p id="accountArea">Connection Status: {connectionStatus.metamask}</p> */}
      <h1>Verification</h1>
      {/* <button onClick={connectContract}>CONNECT TO CONTRACT</button> */}
      <p id="contractArea">{connectionStatus.contract}</p>
      <br />
      <br />
      {/* <div className="labels">USER HASH:</div><input type="text" id="adduserhash" /><br />
            <div className="labels">DOCUMENT HASH:</div><input type="text" id="adddochash" /><br />
            <button onClick={addDoc}>ADD DOCUMENT</button> <br /> */}
      <br />
      <br />
      {/* <div className="labels">USER HASH:</div> */}
      <input type="text" id="verifyuserhash" placeholder='Enter User hash' />
      <br />
      {/* <div className="labels">DOCUMENT HASH:</div> */}
      <input type="text" id="verifydochash"  placeholder='Enter Document hash'/> <br />
      <p id="verifyArea">{verifyResult}</p>
      <br />
      <button onClick={verifyDoc}>VERIFY DOCUMENT</button> <br />
    </div>
  );
};

export default CompanyDash;
