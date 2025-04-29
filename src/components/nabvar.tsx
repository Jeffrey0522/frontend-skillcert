"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiBell } from 'react-icons/fi';
import { GiGraduateCap } from 'react-icons/gi';
import { useWalletStore } from '@/store/walletStore';
import { useWallet } from '@/wallet/walletHooks';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { connectWallet, disconnectWallet } = useWallet();
  const { address, name } = useWalletStore();

  const handleConnect = async () => {
    try {
      await connectWallet();
      setIsConnected(!isConnected);
    } catch (error) {
      console.error('Error connecting wallet: ', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
        setIsConnected(!isConnected);
      }
    } catch (error) {
      console.error('Error disconnecting wallet: ', error);
    }
  }

  return (
    <nav className="bg-gray-800 text-white py-3 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between space-x-10">

        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Image
                src="/skillcert_logo.png"
                alt="Skillcert Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-violet-600">Skillcert</span>
            </div>
          </Link>
          <Link href="/Explore" className="text-gray-300 hover:text-violet-600 transition-colors text-lg ml-6">
            Explore
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all w-64"
          />
        </div>

        <div className="flex items-center space-x-10">


          {!isConnected ? (
            <>
              <Link href="/" className="text-gray-300 hover:text-violet-600 transition-colors">
                Home
              </Link>
              <Link href="/" className="text-gray-300 hover:text-violet-600 transition-colors">
                Contact
              </Link>
              <button
                onClick={handleConnect}
                className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition"
              >
                Connect
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-6">
                <GiGraduateCap className="text-white text-2xl cursor-pointer hover:text-violet-600 transition-colors" />
                <FiBell className="text-white text-2xl cursor-pointer hover:text-violet-600 transition-colors" />
                <Image
                  src="/user.jpeg"
                  alt="User Icon"
                  width={34}
                  height={34}
                  className="rounded-full border-2 border-violet-600 cursor-pointer"
                />
                <button
                  onClick={handleDisconnect}
                  className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition"
                >
                  Disconnect
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
