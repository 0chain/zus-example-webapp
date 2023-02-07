import React, { useState, useEffect } from "react";
import Head from "next/head";

import {
  init,
  setWallet,
  Greeter,
  listAllocations,
  createAllocation,
  getBalance,
  getBalanceWasm,
  bulkUpload,
  getFaucetToken,
  sendToken,
  listObjects,
} from "zus-sdk";

import styles from "../styles/Home.module.css";

const newWallet = {
  clientId: "7d35a6c3ba5066e62989d34cee7dd434d0833d5ea9ff00928aa89994d80e4700",
  privateKey:
    "5ababb1e99fe08e44b9843a0a365a832928f9e1aa2d6bba24e01058f1bf0e813",
  publicKey:
    "5b7ce801f11b5ce02c2ff980469b00e7ed34a9690977661b0cc80bc5eb33ee13baaf6b099f38a2586c5ff63c576870829c117e392fc40868e4bd6418dbaf389c",
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);
  const [allocationList, setAllocationList] = useState([]);
  const [selectedAllocation, setSelectedAllocation] = useState();
  const [filesForUpload, setFilesForUpload] = useState([]);
  const [fileList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [clientId, setClientId] = useState(newWallet.clientId);
  const [privateKey, setPrivateKey] = useState(newWallet.privateKey);
  const [publicKey, setPublicKey] = useState(newWallet.publicKey);
  const [sendTo, setSendTo] = useState(
    "6895775e56cdd6443f864009f178f8878e114136dc779cf40b67c7120dc2fddb"
  );
  const [sendAmount, setSendAmount] = useState("10000000000");

  const configJson = {
    chainId: "0afc093ffb509f059c55478bc1a60351cef7b4e9c008a53a6cc8241ca8617dfe",
    signatureScheme: "bls0chain",
    minConfirmation: 50,
    minSubmit: 50,
    confirmationChainLength: 3,
    blockWorker: "https://dev.0chain.net/dns",
    zboxHost: "https://0box.dev.0chain.net",
    zboxAppType: "vult",
  };

  const config = [
    configJson.chainId,
    configJson.blockWorker,
    configJson.signatureScheme,
    configJson.minConfirmation,
    configJson.minSubmit,
    configJson.confirmationChainLength,
    configJson.zboxHost,
    configJson.zboxAppType,
  ];

  const initClick = async () => {
    //Initialize SDK
    await init(config);
  };

  const listAllocationsClick = async () => {
    //Call listAllocations method
    const allocations = await listAllocations();
    console.log("allocations", allocations);
    setAllocationList(allocations);
  };

  const createAllocationClick = async () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    //name string, datashards, parityshards int, size, expiry int64,minReadPrice, maxReadPrice, minWritePrice, maxWritePrice int64, lock int64,preferredBlobberIds []string
    const config = {
      name: "newalloc",
      datashards: 2,
      parityshards: 2,
      size: 2 * 1073741824,
      expiry: Math.floor(expiry.getTime() / 1000),
      minReadPrice: 0,
      maxReadPrice: 184467440737095516,
      minWritePrice: 0,
      maxWritePrice: 184467440737095516,
      lock: 5000000000,
    };

    //Call createAllocation method
    await createAllocation(config);
    listAllocationsClick();
  };

  const getBalanceClick = async () => {
    //Call getBalance method
    const balanceObj = await getBalance(clientId);
    console.log("balanceObj", balanceObj);
    console.log("balance", balanceObj?.balance);
    setBalance(balanceObj?.balance || 0);
  };

  const getBalanceWasmClick = async () => {
    //Call getBalance method on Wasm
    const balanceObj = await getBalanceWasm(clientId);
    console.log("balanceObj", balanceObj);
    console.log("balance", balanceObj?.zcn);
    setBalance(balanceObj?.zcn || 0);
  };

  const getFaucetTokenClick = async () => {
    console.log("calling getFaucetToken");
    await getFaucetToken();
  };

  const sendTokenClick = async () => {
    console.log("calling sendToken");
    await sendToken(sendTo, parseInt(sendAmount));
  };

  const setWalletClick = async () => {
    console.log("calling set wallet");
    //Call setWallet method
    await setWallet(clientId, privateKey, publicKey);
  };

  const greetClick = async () => {
    //Call Greeter method
    const greetMessage = Greeter("john doe");
    setMessage(greetMessage);
  };

  const selectAllocation = (allocation) => {
    setSelectedAllocation(allocation);
  };

  const handleUploadFiles = async (event) => {
    console.log("handleUploadFiles", event.currentTarget.files);
    setFilesForUpload(event.currentTarget.files);
  };

  const uploadClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for upload");
      return;
    }
    if (!(filesForUpload && filesForUpload.length > 0)) {
      alert("Please select the files for upload");
      return;
    }
    console.log(
      "uploading to allocation",
      selectedAllocation.id,
      filesForUpload
    );
    if (filesForUpload && filesForUpload.length > 0) {
      const objects = [];
      const allocationId = selectedAllocation.id;
      for (const file of filesForUpload) {
        objects.push({
          allocationId: allocationId,
          remotePath: `/${file.name}`,
          file: file,
          thumbnailBytes: null,
          encrypt: false,
          isUpdate: false,
          isRepair: false,
          numBlocks: 100,
          callback: function (totalBytes, completedBytes, error) {
            console.log(
              file.name +
                " " +
                completedBytes +
                "/" +
                totalBytes +
                " err:" +
                error
            );
          },
        });
      }

      const results = await bulkUpload(objects);

      console.log("upload results", JSON.stringify(results));
    }
  };

  const listFilesClick = async () => {
    const list = (await listObjects(selectedAllocation.id, "/")) || [];
    console.log("file list", list);
    setFilesList(list);
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    console.log("selected file", file);
  };

  return (
    <>
      <Head>
        <title>Zus Example Web App</title>
        <meta name="description" content="Zus Example Web App using JS SDK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h3>Zus Example Web App using JS SDK</h3>
          <br />
          <fieldset>
            <legend>Greeter</legend>
            <button id="btnGreet" onClick={greetClick}>
              Greet
            </button>
            <p>{message}</p>
          </fieldset>

          <br />
          <fieldset>
            <legend>SDK Init</legend>
            <button id="btnInit" onClick={initClick}>
              Init
            </button>
          </fieldset>

          <br />
          <fieldset>
            <legend>Wallet</legend>
            <div>
              <label htmlFor="clientId"> ClientID </label>
              <input
                id="clientId"
                name="clientId"
                value={clientId}
                size={90}
                onChange={(e) => setClientId(e.target.value ?? "")}
              />
              <br />
              <label htmlFor="privateKey">PrivateKey</label>
              <input
                id="privateKey"
                name="privateKey"
                value={privateKey}
                size={90}
                onChange={(e) => setPrivateKey(e.target.value ?? "")}
              />
              <br />
              <label htmlFor="publicKey"> PublicKey</label>
              <input
                id="publicKey"
                name="publicKey"
                value={publicKey}
                size={90}
                onChange={(e) => setPublicKey(e.target.value ?? "")}
              />
              <br />

              <button id="btnSetWallet" onClick={setWalletClick}>
                Set Wallet
              </button>
            </div>
            <br />
            <br />
            <div>
              <button id="btnGetFaucetToken" onClick={getFaucetTokenClick}>
                Faucet
              </button>
            </div>
            <div>
              <button id="btnGetBalance" onClick={getBalanceWasmClick}>
                Get Balance Wasm
              </button>
            </div>
            <div>
              <button id="btnGetBalance" onClick={getBalanceClick}>
                Get Balance
              </button>
            </div>
            <br />
            <p>Balance: {balance}</p>
          </fieldset>

          <br />
          <fieldset>
            <legend>Send Token</legend>
            <br />
            <div>
              <label htmlFor="sendTo">Send To</label>
              <input
                id="sendTo"
                name="sendTo"
                value={sendTo}
                size={90}
                onChange={(e) => setSendTo(e.target.value ?? "")}
              />
              <br />
              <label htmlFor="sendAmount">Send Amount</label>
              <input
                id="sendAmount"
                name="sendAmount"
                value={sendAmount}
                size={90}
                onChange={(e) => setSendAmount(e.target.value ?? "")}
              />
              <br />
            </div>
            <div>
              <button id="btnSendToken" onClick={sendTokenClick}>
                Send Token
              </button>
            </div>
            <br />
          </fieldset>

          <br />
          <fieldset>
            <legend>Allocations</legend>
            <div>
              <button id="btnCreateAllocation" onClick={createAllocationClick}>
                Create
              </button>
            </div>
            <br />
            <div>
              <button id="btnListAllocations" onClick={listAllocationsClick}>
                List
              </button>
              <br />
              <br />
              {allocationList && allocationList.length > 0 && (
                <div>
                  <b>Allocation List</b>
                </div>
              )}
              {allocationList.map((allocation, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="selectedAllocation"
                    value={allocation.id}
                    onClick={() => selectAllocation(allocation)}
                  />
                  <label htmlFor={allocation.id}>
                    Allocation: {allocation.id}
                  </label>
                  <br></br>
                </div>
              ))}
            </div>
            <br />
            <div id="listAllocations"></div>
          </fieldset>

          <br />
          <fieldset>
            <legend>File Ops</legend>
            <div>
              <input
                type="file"
                multiple={true}
                name="uploadFile"
                onChange={handleUploadFiles}
              />
              <button id="btnUpload" onClick={uploadClick}>
                Upload
              </button>
            </div>
            <br />
            <div>
              <button id="btnListFiles" onClick={listFilesClick}>
                List
              </button>
              <br />
              <br />
              {fileList && fileList.length > 0 && (
                <div>
                  <b>File List</b>
                </div>
              )}
              {fileList.map((file, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="selectedFile"
                    value={file.name}
                    onClick={() => selectFile(file)}
                  />
                  <label htmlFor={file.name}>&nbsp;{file.name}</label>
                  <br></br>
                </div>
              ))}
            </div>
            <br />
          </fieldset>
        </div>
      </main>
    </>
  );
}
