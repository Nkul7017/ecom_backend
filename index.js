import express from "express";
import * as dotenv from 'dotenv';
import './db/dbconfig.js'
import authrouter from './routes/Auth.js'
import userrouter from './routes/user.js'
import productRouter from './routes/Product.js'
import cartReducer from './routes/Cart.js'
import cors from 'cors'
dotenv.config();
const app=express();
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartReducer)

app.listen(port,()=>{
    console.log(`listening to port - ${port} `)
})