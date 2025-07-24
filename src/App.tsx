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
import SendTokens from "./components/SendTokens";

export default function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster richColors position="top-center" />
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white font-sans relative z-0">
            
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gradient-to-r from-black/70 via-black/50 to-purple-900/40 backdrop-blur-md p-5 flex flex-col md:flex-row justify-between items-center shadow-lg">
              <h1 className="text-3xl font-extrabold text-purple-300 tracking-wide mb-4 md:mb-0">
                Solana Dev Tools
              </h1>
              <div className="flex flex-wrap justify-center gap-3">
                <SolBalance />
                <WalletMultiButton className="z-50 !bg-purple-600 hover:!bg-purple-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
                <WalletDisconnectButton className="z-50 !bg-red-600 hover:!bg-red-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
              </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-stretch">
              {/* Request Airdrop Section */}
              <section className="flex-1 min-h-[500px] bg-black/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-purple-900 transition duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-4 text-center">
                  Request Airdrop
                </h2>
                <RequestAirDrop />
              </section>

              {/* Send Tokens Section */}
              <section className="flex-1 min-h-[500px] bg-black/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-purple-900 transition duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-4 text-center">
                  Send Tokens
                </h2>
                <SendTokens />
              </section>
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
