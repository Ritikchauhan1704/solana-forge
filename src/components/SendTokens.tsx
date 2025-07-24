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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse({
      amount,
      receiver,
    });
    if (!result.success) {
      console.log(result);

      toast.error(result.error.errors[0].message);
      return;
    }
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: new PublicKey(receiver),
        lamports: Number(amount) * LAMPORTS_PER_SOL,
      })
    );

    const signature = await wallet.sendTransaction(transaction, connection);
    console.log(signature);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
