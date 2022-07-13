const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true, minlenght: 1, unique: true},
    email: { type: String, required: true, minlenght: 6, unique: true},
    password: { type: String, required: true, minlenght: 1 },
    admin: {type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('User', User);
