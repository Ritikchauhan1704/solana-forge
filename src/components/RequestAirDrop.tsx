import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
});

export default function RequestAirDrop() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse({ amount });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    if (!wallet.publicKey) {
      toast.error("Wallet not connected");
      return;
    }
    try {
      setLoading(true);
      toast.info("Requesting airdrop...");
      const sig = await connection.requestAirdrop(
        wallet.publicKey,
        Number(amount) * LAMPORTS_PER_SOL
      );
      toast.success("Airdrop successful! ✅");
      console.log("Airdrop Signature:", sig);
    } catch (err: any) {
      if (err.message.includes("429")) {
        toast.error("Rate limit hit. Please wait and try again.");
      } else {
        toast.error("Airdrop failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (wallet.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey.toBase58());
      toast.success("Wallet address copied!");
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-lg border border-purple-700/40 rounded-2xl p-8 shadow-[0_0_20px_rgba(180,0,255,0.2)] space-y-6 transition-all duration-300"
      >
        <h2 className="text-xl text-purple-300 font-semibold text-center">
          Request SOL Airdrop
        </h2>
        <div className="space-y-1">
          <label className="text-sm text-purple-400">Amount (SOL)</label>
          <input
            type="text"
            placeholder="e.g. 0.5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="w-full bg-black/40 text-white placeholder-purple-500 px-5 py-3 rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "🚀 Requesting..." : "💸 Request Airdrop"}
        </button>
        {wallet.publicKey && (
          <div className="space-y-1 text-center">
            <p className="text-sm text-purple-400">Connected Wallet</p>
            <div className="flex items-center justify-center gap-2 bg-black/30 px-4 py-2 rounded-lg font-mono text-purple-200 text-xs">
              <span className="truncate">{wallet.publicKey.toBase58()}</span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-purple-400 hover:text-purple-300 transition text-sm"
              >
                📋
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
