import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const ShowBalance = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState(null);

  const getUserBalance = async () => {
    if (!wallet.publicKey) {
      alert("Connect your wallet first.");
      return;
    }
    try {
      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / 1e9); // Convert lamports to SOL
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      alert("Failed to fetch balance. Please try again.");
    }
  };
  useEffect(()=>{
    getUserBalance();
  },[wallet]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96 mt-4">
      <h2 className="text-xl font-bold mb-4 text-center">Your Balance</h2>
      {balance !== null ? (
        <p className="text-lg text-center mb-4">{balance} SOL</p>
      ) : (
        <p className="text-lg text-center mb-4">Balance not fetched yet.</p>
      )}
    </div>
  );
};

export default ShowBalance;
