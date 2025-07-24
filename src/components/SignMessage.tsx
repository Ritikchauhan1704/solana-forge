import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const onClick = async () => {
    try {
      setSignature(null); // Clear previous signature
      if (!publicKey) {
        toast.error("Wallet not connected!");
        return;
      }
      if (!signMessage) {
        toast.error("Wallet does not support message signing!");
        return;
      }
      const message = inputRef.current?.value;
      if (!message) {
        toast.error("Please enter a message to sign.");
        return;
      }
      setLoading(true);
      const encodedMessage = new TextEncoder().encode(message);
      const signed = await signMessage(encodedMessage);
      const isValid = ed25519.verify(signed, encodedMessage, publicKey.toBytes());
      if (!isValid) throw new Error("Message signature invalid!");
      const base58Signature = bs58.encode(signed);
      setSignature(base58Signature);
      toast.success("Message signed successfully!");
    } catch (err: any) {
      toast.error(err.message || "Signing failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-black/30 to-purple-900/30 backdrop-blur-lg border border-purple-700/40 rounded-2xl p-8 shadow-[0_0_20px_rgba(180,0,255,0.2)] space-y-6 transition-all duration-300">
        <h2 className="text-xl text-purple-300 font-semibold text-center">
          Sign Message
        </h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter message to sign"
          disabled={loading}
          className="w-full bg-black/40 text-white placeholder-purple-500 px-5 py-3 rounded-xl border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50"
        />
        <button
          onClick={onClick}
          disabled={loading || !publicKey}
          className={`w-full py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group ${
            loading || !publicKey
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:cursor-pointer'
          } text-white`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              Signing...
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
              {!publicKey ? 'Connect Wallet First' : 'Sign Message'}
            </>
          )}
        </button>
        {signature && (
          <div className="w-full bg-black/40 backdrop-blur-sm text-purple-300 text-sm p-4 rounded-xl shadow-md break-words">
            <p className="font-semibold mb-2 text-center">Signature:</p>
            <div className="bg-black/50 p-3 rounded-md">
              <code className="text-xs text-purple-200">{signature}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
