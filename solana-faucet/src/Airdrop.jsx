import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Airdrop = () =>{
    const wallet = useWallet();
    const {connection} = useConnection();
    const sendAirdop = async ()=>{
        alert("Hello");
        await connection.requestAirdrop(wallet.publicKey, 1000000000);
        alert("sent solana");
    }
    return(
        <div>
            {/* <h3>Welcome {wallet.publicKey.toString()} </h3> */}
            <input type="text" placeholder="Amount"></input>
            <button onClick={sendAirdop}>Send Airdrop</button>
        </div>
    )
}

export default Airdrop;