const mongoose = require('mongoose');

async function connectToMongo() {
    

    try{

         mongoose.connect(process.env.mongoURI)
    }
    catch{
        process.exit(1);
    }
    }

module.exports = {connectToMongo,}