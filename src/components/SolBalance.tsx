import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function SolBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        if (wallet.publicKey) {
            connection.getBalance(wallet.publicKey).then(setBalance);
        }
    }, [wallet.publicKey]);

  return (
    <div>SOL Balance : {balance / LAMPORTS_PER_SOL}</div>
  )
}
