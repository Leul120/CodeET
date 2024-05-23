const express = require('express');
const app = express();
const cors=require('cors')
const path=require('path')
const courseRoute = require('./routes/courseRoute');
const userRoutes=require('./routes/userRoute')
const connectDB = require('./db/connect');
const bodyParser=require('body-parser')
const AppError =require('./utils/appError')
const GlobalErrorHandler=require('./controllers/ErrorController')
const cookieParser = require('cookie-parser');
require('dotenv').config();

console.log(process.env.NODE_ENV)
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json())


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization','Accept'],
  credentials: true,
}));


app.use('/api',courseRoute)
app.use('/',userRoutes)
app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404))
})
app.use(GlobalErrorHandler)
const hostname='0.0.0.0'



const port = process.env.PORT || 8021;
const start=async ()=>{
    try{ 
        await connectDB(process.env.MONGO_URI)
        app.listen(port ,hostname,
            console.log("running on port: "+port )
        )

    }catch (error){
        console.log(error)
    }
}

start()

