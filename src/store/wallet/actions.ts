import { CREATE_WALLET, Wallet } from "./types";

import { createWallet, setWallet } from "@zerochain/zus-sdk";
import { requestActionTypes, RequestActionTypes } from "store/api-utils";

export const clearStore = () => ({
  type: "CLEAR_STORE",
});

export const createWalletFunc = () => async (dispatch) => {
  const actionType: RequestActionTypes = requestActionTypes(CREATE_WALLET);
  dispatch({ type: actionType.request });

  const handleError = () => {
    dispatch({ type: actionType.error });
    return { error: "Error creating wallet" };
  };

  try {
    const wallet: Wallet = await createWallet();
    if (wallet.id) {
      await setWallet(
        wallet.id,
        wallet.keys.privateKey,
        wallet.keys.publicKey,
        wallet.mnemonic
      );
      dispatch({ type: actionType.success, payload: wallet });
      return { data: wallet };
    } else handleError();
  } catch (error) {
    handleError();
  }
};

export const getFeesTable = () => async (dispatch, getState) => {
  const actionTypes = requestActionTypes(types.GET_FEES_TABLE);
  dispatch({ type: actionTypes.request });

  const { sharders } = getState().zerochain.network;
  if (!(sharders && sharders.length))
    return { error: "error getting sharders" };

  const { data, error } = await consensusRequest({
    endpoint: sharderEndpoints.GET_FEES_TABLE,
    urls: sharders,
  });

  return handleResponseDispatch({
    errMessage: "Error getting fees table",
    actionTypes,
    dispatch,
    error,
    data,
  });
};
