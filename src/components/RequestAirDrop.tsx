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

    const publicKey = wallet.publicKey;
    if (!publicKey) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      setLoading(true);
      toast.info("Requesting airdrop...");
      const sig = await connection.requestAirdrop(
        publicKey,
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

  return (
    <div className="w-full" aria-busy={loading}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full"
      >
        <input
          type="text"
          placeholder="Amount of SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full max-w-xs bg-black/40 text-white placeholder-gray-400 border border-purple-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-xs bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-2 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Requesting..." : "Request Airdrop"}
        </button>
      </form>

      {wallet.publicKey && (
        <p className="text-sm text-purple-300 text-center mt-4 break-all">
          Connected Wallet: {wallet.publicKey.toBase58()}
        </p>
      )}
    </div>
  );
}
