import { createActionTypes } from "lib";

export const CREATE_WALLET = "CREATE_WALLET";
export const CLEAR_STORE = "CLEAR_STORE";

export default createActionTypes([CREATE_WALLET, CLEAR_STORE]);

export type WalletState = {
  list: any[];
  temp: {
    keys: any;
    mnemonic: string;
  };
  activeWalletId: string;
};

export type Wallet = {
  id: string;
  name: string;
  mnemonic: string;
  version: string;
  creationDate: number;
  keys: {
    publicEncryptionKey: string;
    walletId: string;
    privateKey: string;
    publicKey: string;
  };
};
