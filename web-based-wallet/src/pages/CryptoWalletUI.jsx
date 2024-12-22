import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Wallet, HDNodeWallet } from "ethers";
import bs58 from "bs58";

const CryptoWalletUI = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);

  const createWallet = async (type) => {
    const seed = await mnemonicToSeed(mnemonic);
    let newWallet;

    if (type === "solana") {
      const currentIndex = wallets.filter((w) => w.type === "solana").length;
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      newWallet = {
        type: "solana",
        index: currentIndex + 1,
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey), // Correct Base58 conversion
      };
    } else {
      const currentIndex = wallets.filter((w) => w.type === "ethereum").length;
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const wallet = new Wallet(child.privateKey);
      newWallet = {
        type: "ethereum",
        index: currentIndex + 1,
        publicKey: wallet.address,
        privateKey: child.privateKey,
      };
    }

    setWallets([...wallets, newWallet]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-teal-400 mb-8">
        Crypto Wallet Manager
      </h1>

      {/* Mnemonic Section */}
      <div className="max-w-xl mx-auto mb-12">
        <button
          className="w-full py-3 px-4 bg-teal-500 text-black font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300 disabled:opacity-50"
          disabled={mnemonic}
          onClick={async () => {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
        >
          Create Seed Phrase
        </button>
        {mnemonic && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold text-teal-400">Mnemonic:</h2>
            <p className="text-sm mt-2 break-words">{mnemonic}</p>
          </div>
        )}
      </div>

      {/* Wallet Creation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Solana Section */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Solana Wallets</h2>
          <button
            className="w-full py-3 px-4 bg-teal-500 text-black font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300"
            onClick={() => createWallet("solana")}
          >
            Create Solana Wallet
          </button>
          <div className="mt-4 space-y-4">
            {wallets
              .filter((w) => w.type === "solana")
              .map((w) => (
                <div
                  key={w.index}
                  className="p-4 bg-gray-700 rounded-lg shadow-lg"
                >
                  <h3 className="font-bold text-teal-300">Wallet {w.index}</h3>
                  <p className="text-sm text-gray-300">Public Key: {w.publicKey}</p>
                  <p className="text-sm text-gray-300">
                    Private Key: <span className="blur-sm">{w.privateKey}</span>
                    <button
                      className="ml-2 text-teal-400 hover:text-teal-300"
                      onClick={(e) => {
                        const span = e.target.previousSibling;
                        span.classList.toggle("blur-sm");
                      }}
                    >
                      👁
                    </button>
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Ethereum Section */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Ethereum Wallets</h2>
          <button
            className="w-full py-3 px-4 bg-teal-500 text-black font-semibold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300"
            onClick={() => createWallet("ethereum")}
          >
            Create Ethereum Wallet
          </button>
          <div className="mt-4 space-y-4">
            {wallets
              .filter((w) => w.type === "ethereum")
              .map((w) => (
                <div
                  key={w.index}
                  className="p-4 bg-gray-700 rounded-lg shadow-lg"
                >
                  <h3 className="font-bold text-teal-300">Wallet {w.index}</h3>
                  <p className="text-sm text-gray-300">Public Key: {w.publicKey}</p>
                  <p className="text-sm text-gray-300">
                    Private Key: <span className="blur-sm">{w.privateKey}</span>
                    <button
                      className="ml-2 text-teal-400 hover:text-teal-300"
                      onClick={(e) => {
                        const span = e.target.previousSibling;
                        span.classList.toggle("blur-sm");
                      }}
                    >
                      👁
                    </button>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletUI;
