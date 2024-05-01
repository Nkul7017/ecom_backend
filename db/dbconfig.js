import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("database connected")
})
.catch((e)=>console.log(e))