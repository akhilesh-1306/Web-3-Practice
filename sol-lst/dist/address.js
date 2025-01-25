"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_MINT_ADDRESS = exports.PUBLIC_KEY = exports.PRIVATE_KEY = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.PRIVATE_KEY = process.env.private_key;
exports.PUBLIC_KEY = process.env.public_key;
exports.TOKEN_MINT_ADDRESS = new web3_js_1.PublicKey("BJ351S37Vw3rKAzaAeXPCmg4SuJdks75zQHq7SLxDXL9");
