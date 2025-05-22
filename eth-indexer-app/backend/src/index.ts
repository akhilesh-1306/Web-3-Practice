import express from "express"
import { HDNodeWallet } from "ethers6"
import {mnemonicToSeedSync} from "bip39"
import { Client } from "pg"
require("dotenv").config()

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "akhilesh",
    password: "yourpassword",
    port: 5432
});

const MNEMONIC = process.env.MNEMONIC;

client.connect();

const app = express()
app.use(express.json())

const seed = mnemonicToSeedSync(MNEMONIC??"");

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const result = await client.query('INSERT INTO users(username, password, depositAddress, privateKey,balance) values($1, $2, $3, $4, $5) RETURNING id', [username, password, "", "", 0]);

    const userId = result.rows[0].id;

    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(`m/44'/60'/0'/0/${userId}`);

    await client.query('UPDATE users SET depositAddress = $1, privateKey = $2 WHERE id = $3', [child.address, child.privateKey, userId]);

    res.json({
        userId,
    });
})

app.get("/depositAddress/:userId", (req, res) => {
    const result = client.query("SELECT depositAddress FROM users WHERE id = $1", [req.params.userId])
    res.json({
        result
    })
})


app.listen(3000, () => {
    console.log("Example app listening on port 3000!")
})  