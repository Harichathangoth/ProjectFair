const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Successfully connected with psserver");
}).catch((err)=>{
    console.log(`MongoDB Connection Failed!!${err} `);
})