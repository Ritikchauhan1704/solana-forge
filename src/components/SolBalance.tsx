import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function SolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet.publicKey) {
      connection.getBalance(wallet.publicKey).then(setBalance);
    }
  }, [wallet.publicKey]);

  if (!wallet.publicKey) return null;

  return (
    <div className="text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 animate-fade-in">
      <span className="text-lg">🪙</span>
      <span>SOL: {(balance / LAMPORTS_PER_SOL).toFixed(4)}</span>
    </div>
  );
}
