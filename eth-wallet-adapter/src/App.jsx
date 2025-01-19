import { http, createConfig, useConnect, useAccount, useBalance, useSendTransaction } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
// import { config } from './config'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})

function App() {
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector/>
          <Ethsend/>
          <MyAddress/>
        </QueryClientProvider>
      </WagmiProvider>
  )
}

function WalletConnector(){
  const {connectors, connect} = useConnect();
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function MyAddress(){
  const {address} =  useAccount();
  const balance = useBalance({address});
  return(
    <div>
      <h2>{address}</h2>
      <h2>Balance : {balance?.data?.formatted}</h2>
    </div>
  )
}

function Ethsend(){
  const { data: hash, sendTransaction } = useSendTransaction();

  function SendETH(){
    sendTransaction({
      to: document.getElementById('address').value,
      value : 1e17, 
    })
  }
  return(
    <div>
      <input id='address' type='text'></input>
      <button onClick={SendETH}>Send ETH</button>
    </div>
  )
}

export default App
