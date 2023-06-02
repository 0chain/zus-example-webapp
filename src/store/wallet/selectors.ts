import { RootState } from "../reducers";
import { WalletState } from "./types";

export const selectActiveWallet = (state: RootState) => {
  const { list = [], activeWalletId = "" } = state.wallet as WalletState;

  return list.find((wallet) => wallet.id === activeWalletId);
};
