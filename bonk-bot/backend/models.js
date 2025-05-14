const mongoose = require("mongoose");

mongoose.connect()

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    publicKey: String,
    privateKey: String,
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };

