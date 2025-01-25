import "dotenv/config";

import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';
const app = express();

const HELIUS_RESPONSE = { "nativeTransfers": [ { "amount": 10000000, "fromUserAccount": "DS6akxuHotdPUmN8Tn7DMVKZeNda326JLUtnj9GPtzFE", "toUserAccount": "9Firt7Aa4xsqo2LeUGvDLVCBEnZLiytR2KVbiwoFtBTW" } ]};
const vault = "9Firt7Aa4xsqo2LeUGvDLVCBEnZLiytR2KVbiwoFtBTW";

app.post('/helius', async(req, res) => {
    const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(x=>x.toUserAccount == vault);
    if(!incomingTx){
        res.json({message : "processed"});
        return;
    }
    const fromAddress = vault;
    const toAddress = incomingTx.fromUserAccount;
    const amount = incomingTx.amount;
    const type = "received_native_sol";
    // if (type === "received_native_sol") {
        await mintTokens(fromAddress, toAddress, amount);
    // } else {
    //     // What could go wrong here?
    //     await burnTokens(fromAddress, toAddress, amount);
    //     await sendNativeTokens(fromAddress, toAddress, amount);
    // }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});