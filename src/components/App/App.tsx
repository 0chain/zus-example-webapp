import React, { createContext, useCallback, useEffect, useState } from "react";
import { config } from "@/constant/config";
import { init } from "@zerochain/zus-sdk";

export interface AppContextType {
  wallet: any;
  saveWallet: (w: any) => any;
}

export const AppContext = createContext<AppContextType | null>(null);

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState();

  const saveWallet = (w) => {
    localStorage.setItem("wallet", JSON.stringify(w));
    loadWallet();
  };

  const loadWallet = () => {
    const w = localStorage.getItem("wallet");
    if (w?.length) {
      setWallet(JSON.parse(w));
    }
  };

  const initComp = useCallback(async () => {
    await init(config);
    loadWallet();
  }, []);

  useEffect(() => {
    if (!wallet) {
      initComp();
    }
  }, [initComp]);

  return (
    <AppContext.Provider value={{ wallet, saveWallet }}>
      {children}
    </AppContext.Provider>
  );
};