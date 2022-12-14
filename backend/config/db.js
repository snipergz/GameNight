const mongoose = require('mongoose')
require("dotenv").config()
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Successfully Connected');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB