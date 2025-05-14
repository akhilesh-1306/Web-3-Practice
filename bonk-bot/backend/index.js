//Actually the private key is supposed to be fetched from the DB
//But for testing the main functionality, we have ignored the DB part
//Since its just signing and logging in the user
//and then fetching the pvt key of the currently logged in user

const express = require("express")
// const {User} = require("./models.js")
const { Connection, Keypair, Transaction } = require("@solana/web3.js")
const jwt = require("jsonwebtoken")
const bs58 = require("bs58")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())
const JWT_SECRET = "123456"

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/gozV6_lz8j32UN8PmpqGtGOt4_gye6G1")

// app.post("/api/v1/signup", async (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const keyPair = new Keypair();
//     const user = await User.create({
//         username,
//         password,
//         privateKey: keyPair.secretKey.toString(),
//         publicKey : keyPair.publicKey.toString(),
//     })
//     res.json({message : keyPair.publicKey.toString()})
// })

// app.post("/api/v1/login", async (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const user = await User.findOne({
//         username : username,
//         password : password
//     })
//     if(user){ 
//         const token = jwt.sign({
//             id : user
//         },JWT_SECRET)    
//         res.json({
//             token 
//         })
//     }
//     res.status(401).json({message : "Unauthorized"})
// })

app.post("/api/v1/txn/sign", async (req, res) => {
    const serializedTx = req.body.message
    const txn = Transaction.from(Buffer.from(serializedTx))
    const keyPair = Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY));
    txn.sign(keyPair)

    const signature = await connection.sendTransaction(txn,[keyPair])
    console.log(signature)
    res.json({message: "Sign Transaction"})
})

app.get("/api/v1/txn", (req, res) => {
    res.json({message: "Get Transaction"})
})

app.listen(3000, () => console.log("Server is running on port 3000"))