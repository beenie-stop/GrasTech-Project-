import express from "express"
import morgan from "morgan"
import userRoutes from './routes/userRoutes.js'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();

const app= express()//initialiazation of express
// const PORT=process.env.PORT;
app.use(cors());

app.use(express.json());//build-in-middelware
app.use(morgan('dev'))//third party middleware used to log route details


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=>console.log(err))
app.use('/',userRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(5000,()=>{
//    console.log("server running on port 5000")
// })//port,callback function



