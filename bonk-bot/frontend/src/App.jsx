import './App.css'
import {Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL} from '@solana/web3.js'
import axios from 'axios'

const connection  = new Connection("https://solana-devnet.g.alchemy.com/v2/gozV6_lz8j32UN8PmpqGtGOt4_gye6G1")


function App() {
  async function sendSol(){
    const ix = SystemProgram.transfer({
      fromPubkey : new PublicKey("9Firt7Aa4xsqo2LeUGvDLVCBEnZLiytR2KVbiwoFtBTW"),
      toPubkey : new PublicKey("DS6akxuHotdPUmN8Tn7DMVKZeNda326JLUtnj9GPtzFE"),
      lamports : 0.1 * LAMPORTS_PER_SOL,
    });
    const txn = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = new PublicKey("9Firt7Aa4xsqo2LeUGvDLVCBEnZLiytR2KVbiwoFtBTW");

    //the tx.serialize function needs two parameters, recentBlockHash and feePayer
    //So we have to add them first or else we will get error
    const serializedTx = txn.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    console.log(serializedTx);
    await axios.post("http://localhost:3000/api/v1/txn/sign",{
      message : serializedTx,
      retry : false,
    })
  }

  return(
    <div>
      <input type='text' placeholder='Address' id='address'></input>
      <input type='text' placeholder='Amount' id='amount'></input>
      <button onClick={sendSol}>Send</button>
    </div>
  )
}

export default App
