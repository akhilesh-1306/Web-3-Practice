import './App.css'
import {Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL} from '@solana/web3.js'
import axios from 'axios'

const connection  = new Connection("rpc server")


function App() {
  async function sendSol(){
    const ix = SystemProgram.transfer({
      fromPubkey : new PublicKey("public key of sender"),
      toPubkey : new PublicKey("public key of receiver"),
      lamports : 0.1 * LAMPORTS_PER_SOL,
    });
    const txn = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    txn.recentBlockhash = blockhash;
    txn.feePayer = new PublicKey("public key of payer");

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
