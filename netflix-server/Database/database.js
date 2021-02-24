const { mongo } = require("mongoose");


require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(
process.env.DB_URL
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err);
})
