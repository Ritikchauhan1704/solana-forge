import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import RequestAirDrop from "./components/RequestAirDrop";
import { Toaster } from "sonner";
import SolBalance from "./components/SolBalance";

export default function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster richColors position="top-center" />
          <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white flex justify-center items-center px-4">
            <div className="backdrop-blur-lg bg-black/50 border border-purple-500/40 rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-bold text-purple-400 text-center drop-shadow-lg">
                Solana Devnet Faucet
              </h1>

              <div className="flex flex-wrap justify-center gap-3">
                <WalletMultiButton className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition duration-300 shadow" />
                <WalletDisconnectButton className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow" />
              </div>

              <RequestAirDrop />
              <SolBalance />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
