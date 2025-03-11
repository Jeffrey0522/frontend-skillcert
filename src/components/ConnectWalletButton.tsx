"use client";

import { useEffect } from "react";
import { walletKit } from "@/app/utils/walletKit";

const ConnectWallet = () => {
  useEffect(() => {
  
    walletKit.createButton({
      container: document.querySelector("#wallet-container") as HTMLElement,
      onConnect: ({ address }) => {
        console.log("Wallet conectada con dirección:", address);
      },
      onDisconnect: () => {
        console.log("Wallet desconectada");
      },
      buttonText: "Connect Wallet",
    });
  }, []);

  return <div id="wallet-container"></div>;
};

export default ConnectWallet;
