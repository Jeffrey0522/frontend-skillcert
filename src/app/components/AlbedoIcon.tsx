"use client"

import React, { useState, useEffect } from "react"
import albedo from "@albedo-link/intent";
import { toast } from "react-toastify"

interface AlbedoIconProps {
  onConnected?: (publicKey: string | null) => void
}

declare global {
  interface Window {
    albedo?: {
      connect: () => Promise<{ publicKey: string }>
      disconnect: () => Promise<void>
    }
  }
}

const AlbedoIcon: React.FC<AlbedoIconProps> = ({ onConnected }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [isAvailable, setIsAvailable] = useState<boolean>(false)

  // Check if Albedo is available via window or the imported module.
  useEffect(() => {
    if ((typeof window !== "undefined" && window.albedo)) {
      setIsAvailable(true)
    }
  }, [])

  const connectWallet = async () => {

    const toastId = toast.loading("Connecting to Albedo wallet...")
    try {
      setIsConnecting(true)
      setError(null)

      const response = await albedo.publicKey({});
      console.log(response)
      setPublicKey(response.pubkey)
      onConnected?.(response.pubkey)

      toast.update(toastId, {
        render: "Successfully connected to Albedo wallet",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } catch (err) {
      setError("Failed to connect to Albedo wallet")
      setShowDialog(true)
      toast.error("Failed to connect to Albedo wallet")
      toast.dismiss(toastId)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      const toastId = toast.loading("Disconnecting wallet...")
      await window.albedo?.disconnect() || Promise.resolve();
      setPublicKey(null)
      onConnected?.(null)

      toast.update(toastId, {
        render: "Wallet disconnected successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
    } catch (err) {
      console.error("Error disconnecting wallet:", err)
      toast.error("Failed to disconnect wallet")
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
          focus:ring-black
        `}
        title={publicKey ? "Disconnect Wallet" : "Connect Albedo Wallet"}
      >
        <img src="/albedo.png" alt="Albedo Icon" className="w-6 h-6 mr-2" />
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

export default AlbedoIcon