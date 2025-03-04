"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import { xBullWalletConnect } from "@creit.tech/xbull-wallet-connect"

interface xBullIconProps {
  onConnected?: (publicKey: string | null) => void
}

const BullIcon: React.FC<xBullIconProps> = ({ onConnected }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    const toastId = toast.loading("Connecting to xBull wallet...")
    try {
      setIsConnecting(true)
      setError(null)
      const bridge = new xBullWalletConnect()
      const connectedKey = await bridge.connect()
      bridge.closeConnections()
      setPublicKey(connectedKey)
      onConnected?.(connectedKey)
      toast.update(toastId, {
        render: "Successfully connected to xBull wallet",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } catch (err) {
      setError("Failed to connect to xBull wallet")
      toast.update(toastId, {
        render: "Failed to connect to xBull wallet",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    const toastId = toast.loading("Disconnecting wallet...")
    try {
      // No disconnect method provided; simply reset state.
      setPublicKey(null)
      onConnected?.(null)
      toast.update(toastId, {
        render: "Wallet disconnected successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to disconnect wallet",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={publicKey ? disconnectWallet : connectWallet}
        disabled={isConnecting}
        className={`
          flex items-center justify-center
          px-4 py-2 rounded-full
          transition-all duration-200 ease-in-out
          text-sm font-medium
          shadow-md hover:shadow-lg
          ${publicKey ? "bg-black text-white" : "bg-black text-white"}
          ${isConnecting ? "opacity-75 cursor-not-allowed" : ""}
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-green-500
        `}
        title={publicKey ? "Disconnect Wallet" : "Connect xBull Wallet"}
      >
        <img src="/xbull.png" alt="xBull Icon" className="w-6 h-6 mr-2" />
        <span>
          {isConnecting
            ? "Connecting..."
            : publicKey
              ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
              : "Connect Wallet"}
        </span>
      </button>
    </div>
  )
}

export default BullIcon;
