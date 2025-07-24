import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  receiver: z
    .string()
    .trim()
    .min(1, "Receiver is required")
    .refine(
      (val) => {
        try {
          new PublicKey(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid Solana address",
      }
    ),
});

export default function SendTokens() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse({ amount, receiver });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    try {
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: new PublicKey(receiver),
          lamports: Number(amount) * LAMPORTS_PER_SOL,
        })
      );
      const signature = await wallet.sendTransaction(transaction, connection);
      toast.success("Tokens sent! ✅");
      console.log("Transaction signature:", signature);
    } catch (err: any) {
      toast.error("Transaction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-lg border border-purple-700/40 rounded-2xl p-8 shadow-[0_0_20px_rgba(180,0,255,0.2)] space-y-6 transition-all duration-300"
      >
        <h2 className="text-xl text-purple-300 font-semibold text-center">
          Send SOL Tokens
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
        <div className="space-y-1">
          <label className="text-sm text-purple-400">Receiver Address</label>
          <input
            type="text"
            placeholder="Solana Wallet Address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            disabled={loading}
            className="w-full bg-black/40 text-white placeholder-purple-500 px-5 py-3 rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !wallet.publicKey}
          className={`w-full py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group ${
            loading || !wallet.publicKey
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:cursor-pointer'
          } text-white`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {!wallet.publicKey ? 'Connect Wallet First' : 'Send Tokens'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
