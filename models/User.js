const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cash: {type: Number, required: true, default: 10000},
    score: {type: Number, required: true}
});

module.exports = mongoose.model("User", UserSchema);
