import {JsonRpcProvider} from "ethers"
import axios from "axios"

const provider = new JsonRpcProvider("Add RPC Url");

let CURR_BLOCK_NUM = 22537056;

async function main(){
    //First get the interested address for whom we want to monitor
    const interestedAddress = ["0x25E013359922825F811dCDcF32444C91D97171D4",
                               "0xC32c36ad627717b8c178bABE61cd13Ae06D91F6B",
                               "0xD582867c47886D958053Fd5AD62bB106F555eD20"];

    //Now that we have the interested address, we can start polling the blockchain
    //for the transactions related to the interested address
    const transactions = await getTransactionReceipt(CURR_BLOCK_NUM.toString());

    const interestedTransactions = transactions?.result.filter(x => interestedAddress.includes(x.to))

    const fullTxns = await Promise.all(interestedTransactions.map(async ({transactionHash}) => {
        const txn = await provider.getTransaction(transactionHash);
        return txn;
    }))

    console.log(fullTxns)

}

interface TransactionReceipt {
    transactionHash: string;
    from: string;
    to: string;
}

interface TransactionReceiptResponse {
    result: TransactionReceipt[]
}

//Paste the required CURL command from alchemy into postman to get the following
async function getTransactionReceipt(blockNumber: string): Promise<TransactionReceiptResponse> {
    let data = JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "eth_getBlockReceipts",
        "params": [
          "0x14B0BB7" // TODO: add block number here
        ]
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'Add RPC Url',
        headers: { 
          'accept': 'application/json', 
          'content-type': 'application/json', 
          'Cookie': 'Add Cookie'
        },
        data : data
      };
      
      const response = await axios.request(config)
      return response.data;
}

main()