import dotenv from 'dotenv'
import express from 'express'
import connectToDB from "./config/db.js";
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config()
connectToDB();


const app=express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Server is live")
})

app.use("/api/users",userRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})