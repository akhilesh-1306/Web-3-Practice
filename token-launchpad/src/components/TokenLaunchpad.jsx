// import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"
// import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';


// const TokenLaunchpad = () => {  
//     const { connection } = useConnection();
//     const wallet = useWallet();

//     async function createToken() {
//         const mintKeypair = Keypair.generate();
//         const metadata = {
//             mint: mintKeypair.publicKey,
//             name: 'TEST',
//             symbol: 'TEST',
//             uri: 'https://cdn.100xdevs.com/metadata.json',
//             additionalMetadata: [],
//         };

//         const mintLen = getMintLen([ExtensionType.MetadataPointer]);
//         const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
//         const lamports = await getMinimumBalanceForRentExemptMint(connection);

//         const transaction = new Transaction().add(
//             SystemProgram.createAccount({
//                 fromPubkey: wallet.publicKey,
//                 newAccountPubkey: mintKeypair.publicKey,
//                 space: mintLen,
//                 lamports,
//                 programId: TOKEN_2022_PROGRAM_ID,
//             }),
//             createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
//             createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
//             createInitializeInstruction({
//                 programId: TOKEN_2022_PROGRAM_ID,
//                 mint: mintKeypair.publicKey,
//                 metadata: mintKeypair.publicKey,
//                 name: metadata.name,
//                 symbol: metadata.symbol,
//                 uri: metadata.uri,
//                 mintAuthority: wallet.publicKey,
//                 updateAuthority: wallet.publicKey,
//             }),
//         );
            
//         transaction.feePayer = wallet.publicKey;
//         transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//         transaction.partialSign(mintKeypair);

//         await wallet.sendTransaction(transaction, connection);

//         console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
//         const associatedToken = getAssociatedTokenAddressSync(
//             mintKeypair.publicKey,
//             wallet.publicKey,
//             false,
//             TOKEN_2022_PROGRAM_ID,
//         );

//         console.log(associatedToken.toBase58());

//         const transaction2 = new Transaction().add(
//             createAssociatedTokenAccountInstruction(
//                 wallet.publicKey,
//                 associatedToken,
//                 wallet.publicKey,
//                 mintKeypair.publicKey,
//                 TOKEN_2022_PROGRAM_ID,
//             ),
//         );

//         await wallet.sendTransaction(transaction2, connection);

//         const transaction3 = new Transaction().add(
//             createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
//         );

//         await wallet.sendTransaction(transaction3, connection);

//         console.log("Minted!")
//     }

//     return (
//         <div className="flex flex-col items-center justify-center h-screen space-y-4">
//             <h1 className="text-2xl font-bold">Solana Token Launchpad</h1>
//             <input
//                 className="inputText border border-gray-300 rounded-lg p-2 w-64"
//                 type="text"
//                 placeholder="Name"
//             />
//             <input
//                 className="inputText border border-gray-300 rounded-lg p-2 w-64"
//                 type="text"
//                 placeholder="Symbol"
//             />
//             <input
//                 className="inputText border border-gray-300 rounded-lg p-2 w-64"
//                 type="text"
//                 placeholder="Image URL"
//             />
//             <input
//                 className="inputText border border-gray-300 rounded-lg p-2 w-64"
//                 type="text"
//                 placeholder="Initial Supply"
//             />
//             <button onClick={createToken} className="btn bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
//                 Create a token
//             </button>
//         </div>

//     )
// }

// export default TokenLaunchpad;

import React, { useState } from 'react';
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
    MINT_SIZE,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
    getAssociatedTokenAddressSync,
    createAssociatedTokenAccountInstruction,
    createMintToInstruction
} from "@solana/spl-token";

const TokenLaunchpad = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        uri: '',
        supply: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function createToken() {
        const mintKeypair = Keypair.generate();

        // Validate inputs
        // if (!formData.name || !formData.symbol || !formData.uri || !formData.supply) {
        //     alert("All fields are required.");
        //     return;
        // }

        const metadata = {
            mint: mintKeypair.publicKey,
            name: formData.name,
            symbol: formData.symbol,
            uri: formData.uri,
            additionalMetadata: [],
        };

        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID)
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);

        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);

        const associatedToken = getAssociatedTokenAddressSync(
            mintKeypair.publicKey,
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID
            )
        );

        await wallet.sendTransaction(transaction2, connection);

        const transaction3 = new Transaction().add(
            createMintToInstruction(
                mintKeypair.publicKey,
                associatedToken,
                wallet.publicKey,
                parseInt(formData.supply) * Math.pow(10, 9),
                [],
                TOKEN_2022_PROGRAM_ID
            )
        );

        await wallet.sendTransaction(transaction3, connection);

        console.log("Minted!");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Solana Token Launchpad</h1>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Name"
            />
            <input
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Symbol"
            />
            <input
                name="uri"
                value={formData.uri}
                onChange={handleChange}
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Metadata URI"
            />
            <input
                name="supply"
                value={formData.supply}
                onChange={handleChange}
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Initial Supply"
            />
            <button
                onClick={createToken}
                className="btn bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
                Create a token
            </button>
        </div>
    );
};

export default TokenLaunchpad;
