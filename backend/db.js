const mongoose = require('mongoose');

const mongURL = 'mongodb://localhost:27017/inotebook';

const mongoToConnect=async()=>{
    await mongoose.connect(mongURL);
    console.log("mongoose is connected")
}

module.exports=mongoToConnect