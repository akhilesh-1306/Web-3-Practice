import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import ShowBalance from "./ShowBalance";
import SendTokens from "./SendTokens";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState();
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const sendAirdrop = async () => {
    if (!wallet.publicKey) {
      setModalMessage("Connect your wallet first.");
      setIsModalOpen(true);
      return;
    }
    try {
      await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
      setModalMessage("Solana has been successfully sent!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Airdrop failed:", error);
      setModalMessage("Failed to send airdrop. Please try again.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="h-screen bg-gray-900 items-center justify-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Solana Airdrop</h1>
        <input
          id="amount"
          type="text"
          placeholder="Enter SOL"
          onChange={handleAmountChange}
          className="w-full p-3 mb-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendAirdrop}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition"
        >
          Send Airdrop
        </button>
        <button
          onClick={() => setShowBalance(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold transition mt-4"
        >
          Check Balance
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">Notification</h2>
            <p className="text-gray-700 mb-4 text-center">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Conditional Rendering for ShowBalance */}
      {showBalance &&
        <ShowBalance />
      }
      <div>
        <SendTokens/>
      </div>

    </div>
  );
};

export default Airdrop;
