import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const SendTokens = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    const to = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;

    if (!wallet.publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      alert(`Sent ${amount} SOL to ${to}`);
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Failed to send tokens. Please try again.");
    }
  }

  return (
    <div className="mt-5 bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Send SOL Tokens</h1>
        <input
          id="to"
          type="text"
          placeholder="Recipient Address"
          className="w-full p-3 mb-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          id="amount"
          type="text"
          placeholder="Amount (SOL)"
          className="w-full p-3 mb-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendTokens}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendTokens;
