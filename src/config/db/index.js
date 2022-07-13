const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

async function connect () {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log('Connecting Successfully!')
    } catch (error) {
        console.log('Connection Failed!', error);
    }
}

module.exports = { connect }
