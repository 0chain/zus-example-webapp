import { CREATE_WALLET, Wallet } from "./types";

import { createWallet } from "@zerochain/zus-sdk";
import { requestActionTypes, RequestActionTypes } from "store/api-utils";

export const createWalletFunc = () => async (dispatch) => {
  const actionType: RequestActionTypes = requestActionTypes(CREATE_WALLET);
  dispatch({ type: actionType.request });

  const wallet: Wallet = await createWallet();

  if (wallet.id) {
    dispatch({ type: actionType.success, payload: wallet });
    return { data: wallet };
  } else {
    dispatch({ type: actionType.error });
    return { error: "Error creating wallet" };
  }
};
