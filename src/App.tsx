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

export default function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex justify-center items-center px-4">
            <div className="backdrop-blur-md bg-black/40 border border-purple-500/30 rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-extrabold text-purple-400 text-center drop-shadow-lg">
                Solana Faucet <br/> Devnet Airdrop
              </h1>

              <div className="flex flex-wrap justify-center gap-4">
                <WalletMultiButton className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md" />
                <WalletDisconnectButton className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md" />
              </div>

              <RequestAirDrop />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
