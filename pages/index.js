import React, { useState } from "react";
import Head from "next/head";

import {
  init,
  setWallet,
  Greeter,
  listAllocations,
  createAllocation,
  getAllocation,
  getBalance,
  getBalanceWasm,
  bulkUpload,
  download,
  getFaucetToken,
  sendTransaction,
  listObjects,
  share,
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
  const [allocationDetails, setAllocationDetails] = useState();
  const [filesForUpload, setFilesForUpload] = useState([]);
  const [fileList, setFilesList] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [clientId, setClientId] = useState(newWallet.clientId);
  const [privateKey, setPrivateKey] = useState(newWallet.privateKey);
  const [publicKey, setPublicKey] = useState(newWallet.publicKey);
  const [sendTo, setSendTo] = useState(
    "0ab9c5ab5effbe47db31299aff6464e7b447e7fb372109758c0d9dcd596b5429"
  );
  const [sendAmount, setSendAmount] = useState("10000000000");
  const [authTicket, setAuthTicket] = useState(
    "eyJjbGllbnRfaWQiOiIiLCJvd25lcl9pZCI6IjdkMzVhNmMzYmE1MDY2ZTYyOTg5ZDM0Y2VlN2RkNDM0ZDA4MzNkNWVhOWZmMDA5MjhhYTg5OTk0ZDgwZTQ3MDAiLCJhbGxvY2F0aW9uX2lkIjoiMDZmNzRhYWE1OWVmM2E5M2I1NmNkM2E3NTMxODlkODkzNjMzMDllYzk4NWNmMTRiMmMyMTBkYzhkYTFkZmVhNyIsImZpbGVfcGF0aF9oYXNoIjoiODc1MTA4NDFhZDJkZjViZjUwMTA3Yzg1MWNmMDU0ZDVkYzc0YTU2ZTg0NjFjYzBmYmNhZTMzNGVhNzJmNWRlYSIsImFjdHVhbF9maWxlX2hhc2giOiI1ZWRiN2E5ZTIyM2ZkMzVlODczYzJhMzQzZjFhZWZjMGE5ZjE0MWY0YzdkZDZmNzYxOTA4N2YxNGI1OGUyYjU2IiwiZmlsZV9uYW1lIjoiMS5wbmciLCJyZWZlcmVuY2VfdHlwZSI6ImYiLCJleHBpcmF0aW9uIjowLCJ0aW1lc3RhbXAiOjE2NzY0NDQ4OTgsImVuY3J5cHRlZCI6ZmFsc2UsInNpZ25hdHVyZSI6IjcxNzhiODBjYjQ1M2Q3NWUyYzg1YThiNTM4YjAxYjQ1ZTBhY2UwYjdmOGZiZmNjN2RlYzE3NTQ5OTNiZmUwOTMifQ=="
  );

  const configJson = {
    chainId: "0afc093ffb509f059c55478bc1a60351cef7b4e9c008a53a6cc8241ca8617dfe",
    signatureScheme: "bls0chain",
    minConfirmation: 50,
    minSubmit: 50,
    confirmationChainLength: 3,
    blockWorker: "https://dev.zus.network/dns",
    zboxHost: "https://0box.dev.zus.network",
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

  const getAllocationDetailsClick = async (allocationId) => {
    //Call getAllocation method
    const allocation = await getAllocation(allocationId);
    console.log("allocation", allocation);
    setAllocationDetails(allocation);
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

  const sendTransactionClick = async () => {
    console.log("calling sendTransaction");
    const fromWallet = {
      id: clientId,
      public_key: publicKey,
      secretKey: privateKey,
    };
    await sendTransaction(fromWallet, sendTo, parseInt(sendAmount), "");
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

  const downloadClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for download");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for download");
      return;
    }
    console.log(
      "downloading from allocation",
      selectedAllocation.id,
      selectedFile.path
    );
    //allocationID, remotePath, authTicket, lookupHash string, downloadThumbnailOnly bool, numBlocks int
    const file = await download(
      selectedAllocation.id,
      selectedFile.path,
      "",
      "",
      false,
      10
    );
    console.log("downloaded file", file);

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    a.href = file.url;
    a.download = file.fileName;
    a.click();
    window.URL.revokeObjectURL(file.url);
    document.body.removeChild(a);
  };

  const shareClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for share");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for share");
      return;
    }
    console.log("share file", selectedAllocation.id, selectedFile.path);
    //allocationId, filePath, clientId, encryptionPublicKey string, expireAt int, revoke bool,availableAfter string
    const authTick = await share(
      selectedAllocation.id,
      selectedFile.path,
      "",
      "",
      0,
      false,
      0
    );
    console.log("authTicket", authTick);
    setAuthTicket(authTick);
  };

  const downloadSharedClick = async () => {
    if (authTicket) {
      console.log("downloading using authTicket", authTicket);

      //allocationID, remotePath, authTicket, lookupHash string, downloadThumbnailOnly bool, numBlocks int
      const file = await download("", "", authTicket, "", false, 10);
      console.log("downloaded file", file);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = file.url;
      a.download = file.fileName;
      a.click();
      window.URL.revokeObjectURL(file.url);
      document.body.removeChild(a);
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
              <button id="btnSendTransaction" onClick={sendTransactionClick}>
                Send Transaction
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
                  <button
                    id="btnGetAllocation"
                    onClick={() => getAllocationDetailsClick(allocation.id)}
                  >
                    Get Allocation Details
                  </button>
                  <br></br>
                </div>
              ))}
            </div>
            <br />
            <div id="listAllocations"></div>
            <br />
            <br />
            {allocationDetails && (
              <div>
                Allocation Details - id:{allocationDetails.id}, name:{" "}
                {allocationDetails.name}, Size: {allocationDetails.size}, Start
                Time: {allocationDetails.start_time}, Expiration Date:{" "}
                {allocationDetails.expiration_date}
              </div>
            )}
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
                    value={file.path}
                    onClick={() => selectFile(file)}
                  />
                  <label htmlFor={file.path}>&nbsp;{file.path}</label>
                  <button id="btnDownload" onClick={downloadClick}>
                    Download
                  </button>
                  <button id="btnShare" onClick={shareClick}>
                    Share
                  </button>
                  <br />
                </div>
              ))}
            </div>
            <br />
          </fieldset>

          <fieldset>
            <legend>Sharing</legend>
            <label htmlFor="authTicket"> AuthTicket </label>
            <input
              id="authTicket"
              name="authTicket"
              value={authTicket}
              size={90}
              onChange={(e) => setAuthTicket(e.target.value ?? "")}
            />
            <br />
            <br />
            <button id="btnDownloadShared" onClick={downloadSharedClick}>
              Download Shared File
            </button>
          </fieldset>
        </div>
      </main>
    </>
  );
}
