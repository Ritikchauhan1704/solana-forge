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
import SolBalance from "./components/SolBalance";
import SendTokens from "./components/SendTokens";
import { SignMessage } from "./components/SignMessage";
import { Toaster } from "sonner";

export default function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster richColors position="top-center" />
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-black/60 to-purple-900/50 backdrop-blur-md p-5 flex justify-between items-center shadow-lg">
              <h1 className="text-3xl font-extrabold text-purple-300 tracking-wide">
                Solana Dev Tools
              </h1>
              <div className="flex items-center gap-3">
                <SolBalance />
                <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
                <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
              </div>
            </nav>

            {/* Main Content */}
            <main className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Request Airdrop Section */}
              <section className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
                  Request Airdrop
                </h2>
                <RequestAirDrop />
              </section>

              {/* Send Tokens Section */}
              <section className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
                  Send Tokens
                </h2>
                <SendTokens />
              </section>

              {/* Sign Message Section */}
              <section className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
                  Sign Message
                </h2>
                <SignMessage />
              </section>
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
