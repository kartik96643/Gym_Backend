const mongoose = require('mongoose');

async function connectToMongo() {
    

    try{

         mongoose.connect(process.env.mongoURI)
        console.log("Connected")
    }
    catch{
        process.exit(1);
    }
    }

module.exports = {connectToMongo,}
