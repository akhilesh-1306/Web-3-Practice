import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"


const TokenLaunchpad = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    async function createToken() {
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID)
        );
            
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Solana Token Launchpad</h1>
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Name"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Symbol"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Image URL"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Initial Supply"
            />
            <button onClick={createToken} className="btn bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                Create a token
            </button>
        </div>

    )
}

export default TokenLaunchpad;