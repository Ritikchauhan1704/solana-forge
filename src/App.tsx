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
import { useState } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("airdrop");

  const renderSection = () => {
    switch (activeSection) {
      case "airdrop":
        return <RequestAirDrop />;
      case "send":
        return <SendTokens />;
      case "sign":
        return <SignMessage />;
      default:
        return <RequestAirDrop />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "airdrop":
        return "Request Airdrop";
      case "send":
        return "Send Tokens";
      case "sign":
        return "Sign Message";
      default:
        return "Request Airdrop";
    }
  };

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster richColors position="top-center" />
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gradient-to-r from-black/80 via-black/60 to-purple-900/50 backdrop-blur-md p-5 flex justify-between items-center shadow-lg">
              <h1 className="text-3xl font-extrabold text-purple-300 tracking-wide">
                Sol Forge
              </h1>
              <div className="flex items-center gap-3">
                <SolBalance />
                <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
                <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 px-4 py-2 rounded-xl shadow-lg transition-all duration-200" />
              </div>
            </nav>

            {/* Main Content */}
            <main className="p-6 md:p-10 flex flex-col items-center">
              {/* Section Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveSection("airdrop")}
                  className={`px-6 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === "airdrop"
                      ? "bg-purple-600 shadow-lg"
                      : "bg-black/30 hover:bg-purple-900/50"
                  }`}
                >
                  Request Airdrop
                </button>
                <button
                  onClick={() => setActiveSection("send")}
                  className={`px-6 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === "send"
                      ? "bg-purple-600 shadow-lg"
                      : "bg-black/30 hover:bg-purple-900/50"
                  }`}
                >
                  Send Tokens
                </button>
                <button
                  onClick={() => setActiveSection("sign")}
                  className={`px-6 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === "sign"
                      ? "bg-purple-600 shadow-lg"
                      : "bg-black/30 hover:bg-purple-900/50"
                  }`}
                >
                  Sign Message
                </button>
              </div>

              {/* Single Section */}
              <section className="w-full max-w-2xl bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
                  {getSectionTitle()}
                </h2>
                {renderSection()}
              </section>
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
