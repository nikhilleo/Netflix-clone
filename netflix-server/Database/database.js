


require("dotenv").config();
const mongoose = require('mongoose');
console.log(Date(Date.now().toLocaleString()))


mongoose.connect(
process.env.MONGO_URL
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected")
    console.log(Date(Date.now().toLocaleString()))
}).catch((err)=>{
    console.log(err);
})
