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
  showLogs,
  hideLogs,
  deleteObject,
  renameObject,
  copyObject,
  moveObject,
  reloadAllocation,
  transferAllocation,
  freezeAllocation,
  cancelAllocation,
  updateAllocation,
  createDir,
  getFileStats,
  downloadBlocks,
  getUSDRate,
  isWalletID,
  getPublicEncryptionKey,
  getLookupHash,
  createAllocationWithBlobbers,
  getAllocationBlobbers,
  getBlobberIds,
  createReadPool,
  createWallet,
  recoverWallet,
  getAllocationFromAuthTicket,
  getReadPoolInfo,
  lockWritePool,
  getBlobbers,
  decodeAuthTicket,
  initBridge,
  burnZCN,
  mintZCN,
  getMintWZCNPayload,
} from "@zerochain/zus-sdk";

import { startPlay, stopPlay } from "./player";

import styles from "../styles/Home.module.css";
import ActionButton from "../src/components/action-button/ActionButton";
import Input from "../src/components/input/Input";
import Container from "../src/components/container/Container";
import SubContainer from "../src/components/sub-container/SubContainer";
import TextArea from "../src/components/text-area";

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
  const [destFileList, setDestFilesList] = useState([]);
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
  const [newOwnerId, setNewOwnerId] = useState(
    "0ab9c5ab5effbe47db31299aff6464e7b447e7fb372109758c0d9dcd596b5429"
  );
  const [newOwnerPublicKey, setNewOwnerPublicKey] = useState(
    "764e896d08088121d4af9d517eedeac32c463f80245e32f4ccd875db8e621b0c3efeccfbd5007e204e984f2bfbf61bc59aba84ff9d3a0eee0cafd1488e00688e"
  );
  const [newAllocationName, setNewAllocationName] = useState("new");
  const [dirName, setDirName] = useState("/test");
  const [output, setOutput] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [mnemonic, setMnemonic] = useState(
    "crumble innocent find when document spray dutch buzz list giraffe away green drastic hello below siren pact festival hammer swim sweet veteran across like"
  );
  const [txHash, setTxHash] = useState("abc");

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

    //datashards, parityshards int, size, expiry int64,minReadPrice, maxReadPrice, minWritePrice, maxWritePrice int64, lock int64,preferredBlobberIds []string
    const config = {
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

  const createAllocationWithBlobbersClick = async () => {
    const preferredBlobbers = getBlobberListForAllocation();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);

    //datashards, parityshards int, size, expiry int64,minReadPrice, maxReadPrice, minWritePrice, maxWritePrice int64, lock int64,preferredBlobberIds []string
    const config = {
      datashards: 2,
      parityshards: 2,
      size: 2 * 1073741824,
      expiry: Math.floor(expiry.getTime() / 1000),
      minReadPrice: 0,
      maxReadPrice: 184467440737095516,
      minWritePrice: 0,
      maxWritePrice: 184467440737095516,
      lock: 5000000000,
      blobbers: preferredBlobbers,
    };

    //Call createAllocation method
    await createAllocationWithBlobbers(config);
    listAllocationsClick();
  };

  const getAllocationDetailsClick = async (allocationId) => {
    //Call getAllocation method
    const allocation = await getAllocation(allocationId);
    console.log("allocation", allocation);
    setAllocationDetails(allocation);
  };

  const reloadAllocationClick = async (allocationId) => {
    //Call reloadAllocation method
    const allocation = await reloadAllocation(allocationId);
    console.log("allocation", allocation);
    setAllocationDetails(allocation);
  };

  const transferAllocationClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for transfer");
      return;
    }
    console.log(
      "transferring allocation",
      selectedAllocation.id,
      newOwnerId,
      newOwnerPublicKey
    );
    //Call transferAllocation method
    await transferAllocation(
      selectedAllocation.id,
      newOwnerId,
      newOwnerPublicKey
    );
  };

  const freezeAllocationClick = async (allocationId) => {
    //Call freezeAllocation method
    await freezeAllocation(allocationId);
  };

  const cancelAllocationClick = async (allocationId) => {
    //Call cancelAllocation method
    await cancelAllocation(allocationId);
  };

  const updateAllocationClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for update");
      return;
    }
    console.log("updating allocation", selectedAllocation.id);
    //allocationId string, name string,size, expiry int64,lock int64, isImmutable, updateTerms bool,addBlobberId, removeBlobberId string
    const name = newAllocationName,
      size = null,
      expiry = null,
      lock = null,
      isImmutable = false,
      updateTerms = true,
      addBlobberId = "",
      removeBlobberId = "";

    //Call updateAllocation method
    await updateAllocation(
      selectedAllocation.id,
      name,
      size,
      expiry,
      lock,
      isImmutable,
      updateTerms,
      addBlobberId,
      removeBlobberId
    );
  };

  const getBlobberListForAllocation = async () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const referredBlobberURLs = [
        "https://dev2.zus.network/blobber02",
        "https://dev1.zus.network/blobber02",
      ],
      dataShards = 2,
      parityShards = 2,
      size = 2 * 1073741824,
      expiry = Math.floor(expiryDate.getTime() / 1000),
      minReadPrice = 0,
      maxReadPrice = 184467440737095516,
      minWritePrice = 0,
      maxWritePrice = 184467440737095516;

    //Call getAllocationBlobbers method
    const blobberList = await getAllocationBlobbers(
      referredBlobberURLs,
      dataShards,
      parityShards,
      size,
      expiry,
      minReadPrice,
      maxReadPrice,
      minWritePrice,
      maxWritePrice
    );
    console.log("blobberList", blobberList);
    return blobberList;
  };

  const getAllocationBlobbersClick = async () => {
    await getBlobberListForAllocation();
  };

  const getBlobberIdsClick = async () => {
    //https://dev1.zus.network/sharder01/v1/screst/6dba10422e368813802877a85039d3985d96760ed844092319743fb3a76712d7/getblobbers
    //const blobberUrls = [];
    const blobberUrls = [
      "https://dev2.zus.network/blobber02",
      "https://dev1.zus.network/blobber02",
    ];
    //Call getBlobberIds method
    const blobberIds = await getBlobberIds(blobberUrls);
    console.log("blobberIds", blobberIds);
  };

  const createReadPoolClick = async () => {
    //Call createReadPool method
    const result = await createReadPool();
    console.log("result", result);
  };

  const getAllocationFromAuthTicketClick = async () => {
    //Call getAllocationFromAuthTicket method
    console.log("GetAllocFromAuthTicket", authTicket);
    const allocation = await getAllocationFromAuthTicket(authTicket);
    console.log("allocation", allocation);
  };

  const getReadPoolInfoClick = async () => {
    //Call getReadPoolInfo method
    console.log("GetReadPoolInfo", clientId);
    const result = await getReadPoolInfo(clientId);
    console.log("result", result);
  };

  const lockWritePoolClick = async () => {
    //Call lockWritePool method
    const allocationId = selectedAllocation.id;
    console.log("LockWritePool", allocationId);
    //allocationId string, tokens string, fee string
    const result = await lockWritePool(allocationId, 1000, 10);
    console.log("result", result);
  };

  const getBlobbersClick = async () => {
    //Call getBlobbers method
    console.log("GetBlobbers");
    const result = await getBlobbers();
    console.log("result", result);
  };

  const decodeAuthTicketClick = async () => {
    //Call decodeAuthTicket method
    console.log("DecodeAuthTicket", authTicket);
    const result = await decodeAuthTicket(authTicket);
    console.log("result", result);
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

  const createWalletClick = async () => {
    console.log("calling createWallet");
    const wallet = await createWallet();
    console.log("Wallet", wallet);
    setClientId(wallet.keys.walletId);
    setPublicKey(wallet.keys.publicKey);
    setPrivateKey(wallet.keys.privateKey);
  };

  const recoverWalletClick = async () => {
    console.log("calling recoverWallet");
    const wallet = await recoverWallet(mnemonic);
    console.log("Wallet", wallet);
    setClientId(wallet.keys.walletId);
    setPublicKey(wallet.keys.publicKey);
    setPrivateKey(wallet.keys.privateKey);
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
    try {
      debugger;
      const list = (await listObjects(selectedAllocation.id, "/")) || [];
      console.log("file list", list);
      setFilesList(list);
    } catch (error) {
      console.log("error:", error);
    }

    try {
      const destList =
        (await listObjects(selectedAllocation.id, "/test")) || [];
      console.log("dest file list", destList);
      setDestFilesList(destList);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    console.log("selected file", file);
  };

  const showLogsClick = async () => {
    await showLogs();
  };

  const hideLogsClick = async () => {
    await hideLogs();
  };

  const getAppendedFileName = (filename, postfix) => {
    const isExtnExist = filename.lastIndexOf(".") > 0;
    const newFileName = isExtnExist
      ? filename.substring(0, filename.lastIndexOf(".")) +
        postfix +
        filename.substring(filename.lastIndexOf("."), filename.length)
      : filename + postfix;
    console.log("getAppendedFileName", newFileName);
    return newFileName;
  };

  const copyClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for copy");
      return;
    }
    console.log("copy file", selectedAllocation.id, selectedFile.path);
    //allocationId, path, destination
    await copyObject(selectedAllocation.id, selectedFile.path, "/test");
    console.log("copy completed");
  };

  const moveClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for move");
      return;
    }
    console.log("move file", selectedAllocation.id, selectedFile.path);
    //allocationId, path, destination
    await moveObject(selectedAllocation.id, selectedFile.path, "/test");
    console.log("move completed");
  };

  const deleteClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for delete");
      return;
    }
    console.log("delete file", selectedAllocation.id, selectedFile.path);
    //allocationId, path
    await deleteObject(selectedAllocation.id, selectedFile.path);
    console.log("delete completed");
  };

  const renameClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for rename");
      return;
    }
    console.log("rename file", selectedAllocation.id, selectedFile.path);
    //allocationId, path, newName
    await renameObject(
      selectedAllocation.id,
      selectedFile.path,
      getAppendedFileName(selectedFile.path, "_new")
    );
    console.log("rename completed");
  };

  let player;

  let isPlayerReady = false;

  const playClick = async () => {
    player = document.getElementById("player");
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for play");
      return;
    }
    console.log("playing file", selectedAllocation.id, selectedFile.path);

    if (isPlayerReady) {
      if (player.paused) {
        player.play();
      }
    } else {
      const file = selectedFile;
      console.log("playing file", file);
      const isLive = file.type == "d";

      if (file) {
        const allocationId = selectedAllocation.id;
        startPlay({
          allocationId,
          videoElement: player,
          remotePath: file?.path,
          authTicket: "",
          lookupHash: file?.lookup_hash,
          mimeType: file?.mimetype,
          isLive: isLive,
        });
        isPlayerReady = true;
      }
    }
  };

  const playSharedClick = async () => {
    player = document.getElementById("player");

    if (isPlayerReady) {
      if (player.paused) {
        player.play();
      }
    } else {
      const isLive = false;

      if (authTicket) {
        const allocationId = selectedAllocation.id;
        startPlay({
          allocationId,
          videoElement: player,
          remotePath: "",
          authTicket: authTicket,
          lookupHash: "",
          mimeType: "",
          isLive: isLive,
        });
        isPlayerReady = true;
      }
    }
  };

  const pauseClick = async () => {
    player.pause();
  };

  const stopClick = async () => {
    if (isPlayerReady) {
      stopPlay({ videoElement: player });
      isPlayerReady = false;
    }
  };

  const createDirClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    console.log("create Dir", selectedAllocation.id, dirName);
    //allocationId, path
    await createDir(selectedAllocation.id, "/" + dirName);
    console.log("create Dir completed");
  };

  const getFileStatsClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for file stats");
      return;
    }
    console.log("getting file stats", selectedAllocation.id, selectedFile.path);
    const fileStats = await getFileStats(
      selectedAllocation.id,
      selectedFile.path
    );
    console.log("file stats completed", fileStats);
  };

  const downloadBlocksClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation for download blocks");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for download blocks");
      return;
    }
    console.log(
      "downloading blocks from allocation",
      selectedAllocation.id,
      selectedFile.path
    );
    //allocationID, remotePath, authTicket, lookupHash string, numBlocks int, startBlockNumber, endBlockNumber int64, callbackFuncName string
    const output = await downloadBlocks(
      selectedAllocation.id,
      selectedFile.path,
      "",
      "",
      10,
      0,
      10
    );
    console.log("downloaded blocks", output);
  };

  const getUSDRateClick = async () => {
    console.log("getUSDRate");
    const rate = await getUSDRate("zcn");
    console.log("getUSDRate completed", rate);
    setOutput(rate);
  };

  const isWalletIDClick = async () => {
    console.log("isWalletID");
    const output = await isWalletID(clientId);
    //const output = await isWalletID("abc");
    console.log("isWalletID completed", output);
    setOutput("" + output);
  };

  const getPublicEncryptionKeyClick = async () => {
    console.log("getPublicEncryptionKey");
    const key = await getPublicEncryptionKey(mnemonic);
    console.log("getPublicEncryptionKey completed", key);
    setEncryptKey(key);
  };

  const getLookupHashClick = async () => {
    if (!selectedAllocation) {
      alert("Please select allocation");
      return;
    }
    if (!selectedFile) {
      alert("Please select the file for lookup hash");
      return;
    }
    console.log("lookup hash file", selectedAllocation.id, selectedFile.path);
    //allocationId, path
    const hash = await getLookupHash(selectedAllocation.id, selectedFile.path);
    console.log("lookup hash completed", hash);
  };

  const initBridgeClick = async () => {
    const ethereumAddress = "0x5B9eb7E72247c45F6c4B8424FB2002151c57c54d",
      bridgeAddress = "0x2405e40161ea6da91AE0e95061e7A8462b4D5eEa",
      authorizersAddress = "0xB132C20A02AD7C38d88805F0e3fFDdfb54224C58",
      wzcnAddress = "0x10140fbca3a468A1c35F132D75659eF0EB5d95DB",
      ethereumNodeURL =
        "https://goerli.infura.io/v3/6141be73a15d47748af0dc14f53d57d7",
      gasLimit = 300000,
      value = 0,
      consensusThreshold = 75.0;
    console.log(
      "initBridgeClick",
      ethereumAddress,
      bridgeAddress,
      authorizersAddress,
      wzcnAddress,
      ethereumNodeURL,
      gasLimit,
      value,
      consensusThreshold
    );
    //Call initBridge method
    await initBridge(
      ethereumAddress,
      bridgeAddress,
      authorizersAddress,
      wzcnAddress,
      ethereumNodeURL,
      gasLimit,
      value,
      consensusThreshold
    );
  };

  const burnZCNClick = async () => {
    const amount = 1000;
    console.log("burnZCNClick", amount);
    const hash = await burnZCN(amount);
    setTxHash(hash);
    return hash;
  };

  const mintZCNClick = async () => {
    const burnTrxHash = txHash,
      timeout = 100;
    console.log("mintZCNClick", burnTrxHash, timeout);
    const hash = await mintZCN(burnTrxHash, timeout);
    return hash;
  };

  const getMintWZCNPayloadClick = async () => {
    const burnTrxHash = txHash;
    console.log("getMintWZCNPayloadClick", burnTrxHash);
    const result = await getMintWZCNPayload(burnTrxHash);
    return result;
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
        <div className={styles.mainContent}>
          <h3>Zus Example Web App using JS SDK</h3>

          <br />
          <Container title="Logs" subtitle="Render logs in console">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnShowLogs"
                buttonLabel="Show Logs"
                onClick={showLogsClick}
              />
              <ActionButton
                id="btnHideLogs"
                buttonLabel="Hide Logs"
                type="secondary"
                onClick={hideLogsClick}
              />
            </div>
          </Container>

          <Container title="Greeter" subtitle="Greets">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnGreet"
                buttonLabel="Greet"
                onClick={greetClick}
              />
            </div>
            <br />
            <SubContainer title="Message" content={message} />
          </Container>

          <Container title="Init" subtitle="Init">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnInit"
                buttonLabel="Init"
                onClick={initClick}
              />
            </div>
          </Container>

          <Container title="Wallet" subtitle="Wallet">
            <div className={styles.inputContainer}>
              <Input
                id="clientId"
                title="ClientID"
                value={clientId}
                setValue={setClientId}
              />
              <Input
                id="privateKey"
                title="Private Key"
                value={privateKey}
                setValue={setPrivateKey}
              />
              <Input
                id="publicKey"
                title="Public Key"
                value={publicKey}
                setValue={setPublicKey}
              />
            </div>

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnSetWallet"
                buttonLabel="Set Wallet"
                onClick={setWalletClick}
              />
            </div>
            <br />

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnCreateWallet"
                buttonLabel="Create Wallet"
                onClick={createWalletClick}
                type="secondary"
              />
              <ActionButton
                id="btnRecoverWallet"
                buttonLabel="Recover Wallet"
                onClick={recoverWalletClick}
                type="secondary"
              />
              <ActionButton
                id="btnGetFaucetToken"
                buttonLabel="Faucet"
                onClick={getFaucetTokenClick}
                type="secondary"
              />
              <ActionButton
                id="btnGetBalance"
                buttonLabel="Get Balance Wasm"
                onClick={getBalanceWasmClick}
                type="secondary"
              />
              <ActionButton
                id="btnGetBalance"
                buttonLabel="Get Balance"
                onClick={getBalanceClick}
                type="secondary"
              />
            </div>
            <br />
            <SubContainer title="Balance" content={balance} />
          </Container>

          <Container title="Send Token" subtitle="Send Token">
            <div className={styles.inputContainer}>
              <Input
                id="sendTo"
                title="Send To"
                value={sendTo}
                setValue={setSendTo}
              />
              <Input
                id="sendAmount"
                title="Send Amount"
                value={sendAmount}
                setValue={setSendAmount}
              />
            </div>

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnSendTransaction"
                buttonLabel="Send Transaction"
                onClick={sendTransactionClick}
              />
            </div>
          </Container>

          <Container title="Allocations" subtitle="Allocations">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnCreateAllocation"
                buttonLabel="Create"
                onClick={createAllocationClick}
              />
              <ActionButton
                id="btnListAllocations"
                buttonLabel="List"
                onClick={listAllocationsClick}
                type="secondary"
              />
              <ActionButton
                id="btnCreateAllocation"
                buttonLabel="Create With Blobbers"
                onClick={createAllocationWithBlobbersClick}
                type="secondary"
              />
            </div>

            {allocationList && allocationList.length > 0 && (
              <Container title="Allocation List">
                {allocationList?.map((allocation, index) => (
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

                    <div className={styles.buttonContainer}>
                      <ActionButton
                        id="btnGetAllocation"
                        buttonLabel="Get Details"
                        onClick={() => getAllocationDetailsClick(allocation.id)}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnReloadAllocation"
                        buttonLabel="Reload"
                        onClick={() => reloadAllocationClick(allocation.id)}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnFreezeAllocation"
                        buttonLabel="Freeze"
                        onClick={() => freezeAllocationClick(allocation.id)}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnCancelAllocation"
                        buttonLabel="Cancel"
                        onClick={() => cancelAllocationClick(allocation.id)}
                        type="secondary"
                      />
                    </div>
                  </div>
                ))}

                {allocationDetails && (
                  <div>
                    <SubContainer
                      title="Allocation Details"
                      content={`Id: ${allocationDetails?.id}, Name: ${allocationDetails?.name}, Size: ${allocationDetails?.size}, Start Time: ${allocationDetails?.start_time}, Expiration Date: ${allocationDetails?.expiration_date}`}
                    />
                    <label htmlFor={allocation.id}>
                      Allocation: {allocation.id}
                    </label>
                    <button
                      id="btnGetAllocation"
                      onClick={() => getAllocationDetailsClick(allocation.id)}
                    >
                      Get Details
                    </button>
                    <button
                      id="btnReloadAllocation"
                      onClick={() => reloadAllocationClick(allocation.id)}
                    >
                      Reload
                    </button>
                    <button
                      id="btnFreezeAllocation"
                      onClick={() => freezeAllocationClick(allocation.id)}
                    >
                      Freeze
                    </button>
                    <button
                      id="btnCancelAllocation"
                      onClick={() => cancelAllocationClick(allocation.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div id="listAllocations"></div>
                {allocationDetails && (
                  <div>
                    Allocation Details - id:{allocationDetails.id}, Size:{" "}
                    {allocationDetails.size}, Start Time:{" "}
                    {allocationDetails.start_time}, Expiration Date:{" "}
                    {allocationDetails.expiration_date}
                  </div>
                )}
              </Container>
            )}
            <br />
            <Container title="Transfer Allocation">
              <div className={styles.inputContainer}>
                <Input
                  id="newOwnerId"
                  title="New Owner Id"
                  value={newOwnerId}
                  setValue={setNewOwnerId}
                />
                <Input
                  id="newOwnerPublicKey"
                  title="New Owner Public Key"
                  value={newOwnerPublicKey}
                  setValue={setNewOwnerPublicKey}
                />
              </div>

              <div className={styles.buttonContainer}>
                <ActionButton
                  id="btnTransferAllocation"
                  buttonLabel="Transfer"
                  onClick={transferAllocationClick}
                />
              </div>
            </Container>
            <br />
            <Container title="Update Allocation">
              <div className={styles.inputContainer}>
                <Input
                  id="newAllocationName"
                  title="New Allocation Name"
                  value={newAllocationName}
                  setValue={setNewAllocationName}
                />
              </div>

              <br />

              <Container
                title="Extended Allocation Ops"
                subtitle="Extended Allocation Ops"
              >
                <div className={styles.buttonContainer}>
                  <ActionButton
                    id="btnGetAllocationBlobbers"
                    buttonLabel="Get Allocation Blobbers"
                    onClick={getAllocationBlobbersClick}
                  />
                  <ActionButton
                    id="btnGetBlobberIdsClick"
                    buttonLabel="Get Blobber Ids"
                    onClick={getBlobberIdsClick}
                  />
                  <ActionButton
                    id="btnCreateReadPoolClick"
                    buttonLabel="Create ReadPool"
                    onClick={createReadPoolClick}
                  />
                  <ActionButton
                    id="btnGetAllocationFromAuthTicket"
                    buttonLabel="Get Allocation From AuthTicket"
                    onClick={getAllocationFromAuthTicketClick}
                  />
                  <ActionButton
                    id="btnGetReadPoolInfo"
                    buttonLabel="Get ReadPool Info"
                    onClick={getReadPoolInfoClick}
                  />
                  <ActionButton
                    id="btnLockWritePoolClick"
                    buttonLabel="Lock WritePool"
                    onClick={lockWritePoolClick}
                  />
                  <ActionButton
                    id="btnGetBlobbersClick"
                    buttonLabel="Get Blobbers"
                    onClick={getBlobbersClick}
                  />
                  <ActionButton
                    id="btnDecodeAuthTicketClick"
                    buttonLabel="Decode AuthTicket"
                    onClick={decodeAuthTicketClick}
                  />
                </div>
              </Container>

              <br />

              <Container title="File Ops" subtitle="File Ops">
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
                      <b>File List: /</b>
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
                      <button id="btnCopy" onClick={copyClick}>
                        Copy
                      </button>
                      <button id="btnMove" onClick={moveClick}>
                        Move
                      </button>
                      <button id="btnDelete" onClick={deleteClick}>
                        Delete
                      </button>
                      <button id="btnRename" onClick={renameClick}>
                        Rename
                      </button>
                      <button id="btnGetFileStats" onClick={getFileStatsClick}>
                        Get File Stats
                      </button>
                      <button
                        id="btnDownloadBlocks"
                        onClick={downloadBlocksClick}
                      >
                        Download Blocks
                      </button>
                      <button
                        id="btnGetLookupHash"
                        onClick={getLookupHashClick}
                      >
                        Lookup Hash
                      </button>
                      <br />
                    </div>
                  ))}
                  <br />
                  {destFileList && destFileList.length > 0 && (
                    <div>
                      <b>File List: /test</b>
                    </div>
                  )}
                  {destFileList.map((file, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        name="selectedFile"
                        value={file.path}
                        onClick={() => selectFile(file)}
                      />
                      <label htmlFor={file.path}>&nbsp;{file.path}</label>
                      <div className={styles.buttonContainer}>
                        <ActionButton
                          id="btnDestDownload"
                          buttonLabel="Download"
                          onClick={downloadClick}
                        />
                        <ActionButton
                          id="btnDestDelete"
                          buttonLabel="Delete"
                          onClick={deleteClick}
                        />
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
                <br />
              </Container>

              <br />
              <Container title="Extended File Ops">
                <div>
                  <div className={styles.inputContainer}>
                    <Input
                      id="dirName"
                      title="Directory Name"
                      value={dirName}
                      size={30}
                      onChange={(e) => setDirName(e.target.value ?? "")}
                      setValue={setDirName}
                    />
                  </div>
                  <div className={styles.buttonContainer}>
                    <ActionButton
                      id="btnUpdateAllocation"
                      buttonLabel="Update"
                      onClick={updateAllocationClick}
                    />
                  </div>
                </div>
              </Container>
            </Container>
          </Container>

          <Container title="File Ops" subtitle="File Ops">
            <input
              type="file"
              multiple={true}
              name="uploadFile"
              onChange={handleUploadFiles}
            />
            <div className={styles.buttonContainer} style={{ marginTop: 15 }}>
              <ActionButton
                id="btnUpload"
                buttonLabel="Upload"
                onClick={uploadClick}
              />
              <ActionButton
                id="btnListFiles"
                buttonLabel="List"
                onClick={listFilesClick}
                type="secondary"
              />
            </div>

            {fileList && fileList.length > 0 && (
              <Container title="File List: /">
                {fileList?.map((file, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="selectedFile"
                      value={file.path}
                      onClick={() => selectFile(file)}
                    />
                    <label htmlFor={file.path}>&nbsp;{file.path}</label>
                    <div className={styles.buttonContainer}>
                      <ActionButton
                        id="btnDownload"
                        buttonLabel="Download"
                        onClick={downloadClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnShare"
                        buttonLabel="Share"
                        onClick={shareClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnCopy"
                        buttonLabel="Copy"
                        onClick={copyClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnMove"
                        buttonLabel="Move"
                        onClick={moveClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnDelete"
                        buttonLabel="Delete"
                        onClick={deleteClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnRename"
                        buttonLabel="Rename"
                        onClick={renameClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnGetFileStats"
                        buttonLabel="Get File Stats"
                        onClick={getFileStatsClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnDownloadBlocks"
                        buttonLabel="Download Blocks"
                        onClick={downloadBlocksClick}
                        type="secondary"
                      />
                      <ActionButton
                        id="btnGetLookupHash"
                        buttonLabel="Lookup Hash"
                        onClick={getLookupHashClick}
                        type="secondary"
                      />
                    </div>
                  </div>
                ))}
              </Container>
            )}

            {destFileList && destFileList.length > 0 && (
              <Container title="File List: /test">
                {destFileList.map((file, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="selectedFile"
                      value={file.path}
                      onClick={() => selectFile(file)}
                    />
                    <label htmlFor={file.path}>&nbsp;{file.path}</label>

                    <div className={styles.buttonContainer}>
                      <ActionButton
                        id="btnDestDownload"
                        buttonLabel="Download"
                        onClick={downloadClick}
                      />
                      <ActionButton
                        id="btnDestDelete"
                        buttonLabel="Delete"
                        onClick={deleteClick}
                        type="secondary"
                      />
                      <br />
                    </div>
                  </div>
                ))}
              </Container>
            )}
          </Container>

          <Container title="Extended File Ops" subtitle="Extended File Ops">
            <div className={styles.inputContainer}>
              <Input
                id="dirName"
                title="Directory Name"
                value={dirName}
                setValue={setDirName}
              />
            </div>

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnCreateDir"
                buttonLabel="Create Directory"
                onClick={createDirClick}
              />
            </div>
          </Container>

          <Container title="Auth Ticket" subtitle="Auth Ticket">
            <div className={styles.inputContainer}>
              <Input
                id="authTicket"
                title="Auth Ticket"
                value={authTicket}
                setValue={setAuthTicket}
              />
            </div>

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnDownloadShared"
                buttonLabel="Download Shared File"
                onClick={downloadSharedClick}
              />
            </div>
          </Container>

          <Container title="Media WebPlayer" subtitle="Media WebPlayer">
            <video
              id="player"
              preload="metadata"
              controls
              width="320"
              height="240"
            ></video>

            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnPlay"
                buttonLabel="Play"
                onClick={playClick}
              />
              <ActionButton
                id="btnPlayShared"
                buttonLabel="Play with auth ticket"
                onClick={playSharedClick}
                type="secondary"
              />
              <ActionButton
                id="btnPause"
                buttonLabel="Pause"
                onClick={pauseClick}
                type="secondary"
              />
              <ActionButton
                id="btnStop"
                buttonLabel="Stop"
                onClick={stopClick}
                type="secondary"
              />
            </div>
          </Container>

          <Container title="Utils" subtitle="Utils">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnGetUSDRate"
                buttonLabel="USD Rate"
                onClick={getUSDRateClick}
              />
              <ActionButton
                id="btnIsWalletID"
                buttonLabel="isWalletID"
                onClick={isWalletIDClick}
              />
            </div>
            <br />
            <SubContainer title="Output" content={output} />
          </Container>

          <Container title="Encryption Key" subtitle="Encryption Key">
            <TextArea
              id="mnemonic"
              name="mnemonic"
              rows="4"
              value={mnemonic}
              setValue={setMnemonic}
              title="Mnemonic"
            />
            <br />
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnGetPublicEncryptKey"
                buttonLabel="Get Public Encrypt Key"
                onClick={getPublicEncryptionKeyClick}
              />
            </div>
          </Container>

          <Container title="Bridge Methods" subtitle="Bridge Methods">
            <div className={styles.buttonContainer}>
              <ActionButton
                id="btnInitBridge"
                buttonLabel="Init Bridge"
                onClick={initBridgeClick}
              />
              <ActionButton
                id="btnBurnZCN"
                buttonLabel="Burn ZCN"
                onClick={burnZCNClick}
              />
              <ActionButton
                id="btnGetMintWZCNPayload"
                buttonLabel="Get Mint WZCN Payload"
                onClick={getMintWZCNPayloadClick}
              />
              <ActionButton
                id="btnMintZCN"
                buttonLabel="Mint ZCN"
                onClick={mintZCNClick}
              />
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
