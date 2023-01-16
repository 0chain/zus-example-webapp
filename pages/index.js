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
} from "zus-sdk";

import styles from "../styles/Home.module.css";

const testWallet = {
  clientId: "5cd1d56a0842db11994ee2221f9f6468d36f9b89ba016880ac2598d214671012",
  privateKey:
    "6050f9a83bd8c15aa478d99c4dc2dd15a2f415c2b6f3d6e860bc8ab19ac92012",
  publicKey:
    "495cc7e63c3395d6afc632334a6fefcbdaca15e37da4f0416bc0d1b44ff4571a4d2a748307ca55c7439611148cbf18188a4eef3474b752fd64ded7fd02606c9f",
};

export default function Home() {
  const [myWallet, setMyWallet] = useState(testWallet);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);
  const [allocationList, setAllocationList] = useState([]);
  const [selectedAllocation, setSelectedAllocation] = useState();
  const [filesForUpload, setFilesForUpload] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      //Initialize SDK
      await init();

      //Call setWallet method
      await setWallet(
        testWallet.clientId,
        testWallet.privateKey,
        testWallet.publicKey
      );
    };

    loadData();
  }, []);

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

    config.size = convertToBytes(config.size);
    config.minReadPrice = convertZCNToToken(config.minReadPrice);
    config.maxReadPrice = convertZCNToToken(config.maxReadPrice);
    config.minWritePrice = convertZCNToToken(config.minWritePrice);
    config.maxWritePrice = convertZCNToToken(config.maxWritePrice);
    config.lock = convertZCNToToken(config.lock);

    //Call createAllocation method
    await createAllocation(config);
    listAllocationsClick();
  };

  const convertToBytes = (value, unit) => {
    const K = 1024;
    if (value === 0) return 0;

    const i = getIndexUnit(unit);

    return value * Math.pow(K, i);
  };

  const getIndexUnit = (unit) => {
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    return SIZES.indexOf(unit);
  };

  const convertZCNToToken = (zcn) => zcn * 10000000000;

  const getBalanceClick = async () => {
    //Call getBalance method
    const balanceObj = await getBalance(myWallet.clientId);
    console.log("balanceObj", balanceObj);
    console.log("balance", balanceObj?.balance);
    setBalance(balanceObj?.balance || 0);
  };

  const getBalanceWasmClick = async () => {
    //Call getBalance method on Wasm
    const balanceObj = await getBalanceWasm(myWallet.clientId);
    console.log("balanceObj", balanceObj);
    console.log("balance", balanceObj?.zcn);
    setBalance(balanceObj?.zcn || 0);
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
      const allocationId = selectAllocation.id;
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
            <legend>Wallet</legend>
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
              {allocationList && <div>Allocation List</div>}
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
          </fieldset>
        </div>
      </main>
    </>
  );
}
