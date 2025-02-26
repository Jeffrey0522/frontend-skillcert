import ConnectWallet from "@/app/components/ConnectWalletButton";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <ConnectWallet />
    </div>
  );
}
