// const mongoose = require("mongoose");

// var mongoURL = 'mongodb+srv://Imesh:Imesh1234@cluster0.ygreoof.mongodb.net/sripass'

// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

// var db = mongoose.connection

// db.on('connected', () => {
//     console.log(`Mongodb Connection Success!`);
// })

// db.on('error', () => {
//     console.log(`Mongodb Connection failed!`);
// })

// module.exports = mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sripass';

    try {
        await mongoose.connect(mongoURI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`[database] Connected to ${mongoURI}`);
    } catch (error) {
        console.error('[database] Mongo connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
