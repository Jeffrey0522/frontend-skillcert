import {
    StellarWalletsKit,
    WalletNetwork,
    allowAllModules,
    XBULL_ID,
  } from "@creit.tech/stellar-wallets-kit";
  
  export const walletKit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET, 
    selectedWalletId: XBULL_ID, 
    modules: allowAllModules(), 
  });
  