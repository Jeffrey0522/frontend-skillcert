import {
    StellarWalletsKit,
    WalletNetwork,
    allowAllModules,
    XBULL_ID,
  } from "@creit.tech/stellar-wallets-kit";
  
  export const walletKit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET, // O WalletNetwork.PUBLIC para producción
    selectedWalletId: XBULL_ID, // Valor por defecto; se cargan todos los módulos
    modules: allowAllModules(), // Carga todos los módulos: Albedo, Freighter, Hana, Ledger, Trezor, Lobstr, Rabet, WalletConnect, xBull, HOT Wallet
  });
  