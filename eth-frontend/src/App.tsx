import './App.css'
import { useAccount, useConnectors, useDisconnect, useReadContract, WagmiProvider } from 'wagmi'
import {config} from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AllowUSDT } from './AllowUSDT'

const client = new QueryClient()
function App() {
  return(
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet/>
        <TotalSupply/> 
        <AllowUSDT/>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

//This function is used to read from the blockchain
//Right now we are only using totalSupply
//We can also use any function we want from the ABI's
function TotalSupply(){
  const { data, isLoading, error } = useReadContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: [{
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
    ],
    functionName: 'totalSupply',
  })

  if(isLoading){
    return(
      <div>
        Loading ...
      </div>
    )
  }
  if(error){
    return(
      <div>
        Error while loading
      </div>
    )
  }
  return (
    <div>
        Total supply  - {JSON.stringify(data?.toString())}
    </div>
  )
}

//This is just used to add the connect wallet button  
function ConnectWallet(){
  const {address} = useAccount();
  const {disconnect} = useDisconnect();
  if(address){
    return(
      <div>
        <h2>Already connected with : {address}</h2>
        <button onClick={()=>disconnect()}>Disconnect</button>
      </div>
    )
  }

  const connectors = useConnectors();
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connector.connect()}>
      {connector.name}
    </button>
  ))
}

export default App
